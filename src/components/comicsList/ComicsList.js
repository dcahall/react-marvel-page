import {useState, useEffect, useMemo} from 'react';
import { Link } from 'react-router-dom';

import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './comicsList.scss';

const setContent = (process, Component, newItemLoading) => {

	switch (process) {
		case 'waiting':
			return <Spinner/>;
		case 'loading':
			return newItemLoading ? <Component/> : <Spinner/>;
		case 'error':
			return <ErrorMessage/>;
		case 'confirmed':
			return <Component/>;
		default: 
			return new Error('Unknown state');
	}
}

const ComicsList = () => {

    const [comicsList, setComicsList] = useState([]);
    const [newItemLoading, setnewItemLoading] = useState(false);
    const [offset, setOffset] = useState(0);
    const [comicsEnded, setComicsEnded] = useState(false);

    const {getAllComics, process, setProcess} = useMarvelService();

    useEffect(() => {
        onRequest(offset, true);
		//eslint-disable-next-line
    }, [])

    const onRequest = (offset, initial) => {
        initial ? setnewItemLoading(false) : setnewItemLoading(true);
        getAllComics(offset)
            .then(onComicsListLoaded)
			.then(() => setProcess('confirmed'))
    }

    const onComicsListLoaded = (newComicsList) => {
        let ended = false;
        if (newComicsList.length < 8) {
            ended = true;
        }
        setComicsList([...comicsList, ...newComicsList]);
        setnewItemLoading(false);
        setOffset(offset + 8);
        setComicsEnded(ended);
    }

    function renderItems (comicsList) {
        const items = comicsList.map((item, i) => {
            return (
				<li className="comics__item" key={item.id}>
					<Link to={`/comics/${item.id}`}>
						<img src={item.thumbnail} alt={item.title} className="comics__item-img"/>
						<div className="comics__item-name">{item.title}</div>
						<div className="comics__item-price">{item.price}</div>
					</Link>
				</li>
            )
        })

        return (
			<ul className="comics__grid">
                {items}
			</ul>
        )
    }

	const elements = useMemo(() => {
		return setContent(process, () => renderItems(comicsList), newItemLoading);
		//eslint-disable-next-line
	}, [process])

    return (
        <div className="comics__list">
			{elements}
            <button 
                disabled={newItemLoading} 
                style={{'display' : comicsEnded ? 'none' : 'block'}}
				className={`button button__main button__long ${newItemLoading ? `button__long_active` : null}`}                onClick={() => onRequest(offset)}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;