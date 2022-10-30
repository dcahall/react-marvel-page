import './SingleComicPage.scss';

import Spinner from '../components/spinner/Spinner';
import ErrorMessage from '../components/errorMessage/ErrorMessage';
import useMarvelService from '../services/MarvelService';

import { useParams, useNavigate, Link, useLocation } from 'react-router-dom';
import React from 'react';

const SingleComicPage = () => {
	const { comicId } = useParams();
	const [ comic, setComic ] = React.useState(null);
	const { loading, error, getComic, clearError } = useMarvelService();
	const navigate = useNavigate();
	
	React.useEffect(() => {
		updateComic();
	}, [comicId])

	const updateComic = () => {
		clearError();
		getComic(comicId)
			.then(onComicLoaded)
	}

	const onComicLoaded = (comic) => {
		setComic(comic);
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
	const content = comic ? <View comic={comic} onNavigate={onNavigate}/> : null;


    return (
		<>
			{errorMessage || spinner || content}
		</>
    )
}

const View = ({comic, onNavigate}) => {
	const { title, description, pageCount, thumbnail, language, price} = comic;

	return (
        <div className="single-comic">
            <img src={thumbnail} alt={title} className="single-comic__img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{title}</h2>
                <p className="single-comic__descr">{description}</p>
                <p className="single-comic__descr">{pageCount}</p>
                <p className="single-comic__descr">Language: {language}</p>
                <div className="single-comic__price">{price}</div>
            </div>
			<h2
				className="single-comic__back"
				onClick={onNavigate}>Go back</h2>
        </div>
	);
}

export default SingleComicPage;