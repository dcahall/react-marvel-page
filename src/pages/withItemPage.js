import { useParams, useNavigate} from 'react-router-dom';
import React from 'react';

import useMarvelService from '../services/MarvelService';
import setContent from '../utils/setContent';

const withItemPage = (BaseComponent, getData) => {
	return (() => {
			const { uniqId } = useParams();
			const [ data, setData ] = React.useState(null);
			const { getFullCharacter, getComic, process, setProcess } = useMarvelService();
			const navigate = useNavigate();
			
			React.useEffect(() => {
				updateData();
				//eslint-disable-next-line
			}, [uniqId])
		
			const updateData = () => {

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
				setProcess('confirmed');
			}
			
			const onNavigate = () => {
				if (window.history.state && window.history.state.idx === 0) {
					navigate('/', {replace: true});
				} else {
					navigate(-1);
				}
			}
			
			const elements = React.useMemo(() => {
				return setContent(process, () => <BaseComponent data={data} onNavigate={onNavigate}/>);
				//eslint-disable-next-line
			}, [process])

		
			return (
				<>
					{elements}
				</>
			)
		}
	);
}

export default withItemPage;