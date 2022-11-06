import { useParams, useNavigate} from 'react-router-dom';
import React from 'react';

import Spinner from '../components/spinner/Spinner';
import ErrorMessage from '../components/errorMessage/ErrorMessage';
import useMarvelService from '../services/MarvelService';


const withItemPage = (BaseComponent, getData) => {
	return (() => {
			const { uniqId } = useParams();
			const [ data, setData ] = React.useState(null);
			const { loading, error, clearError, getFullCharacter, getComic } = useMarvelService();
			const navigate = useNavigate();
			
			React.useEffect(() => {
				updateData();
			}, [uniqId])
		
			const updateData = () => {
				clearError();

				if (getData === 'comic'){
					getComic(uniqId)
						.then(onDataLoaded)
				} else if (getData === 'character') {
					getFullCharacter(uniqId)
						.then(onDataLoaded)
				}
			}
		
			const onDataLoaded = (data) => {
				setData(data);
			}
			
			const onNavigate = () => {
				if (window.history.state && window.history.state.idx === 0) {
					navigate('/', {replace: true});
				} else {
					navigate(-1);
				}
			}
		
			const errorMessage = error ? <ErrorMessage/> : null;
			const spinner = loading ? <Spinner/> : null;
			const content = data ? <BaseComponent data={data} onNavigate={onNavigate}/> : null;
		
		
			return (
				<>
					{errorMessage || spinner || <BaseComponent onNavigate={onNavigate} data={data}/>}
				</>
			)
		}
	);
}

export default withItemPage;