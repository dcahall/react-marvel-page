import React from 'react';
import PropTypes from 'prop-types'

import './charList.scss';
import MarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/Error.Message';
import Spinner from '../spinner/Spinner';

const CharList = (props) => {
	const [charList, setCharList] = React.useState([]);
	const [loading, setLoading] = React.useState(true);
	const [error, setError] = React.useState(false);
	const [newItemLoading, setNewItemLoading] = React.useState(false);
	const [offset, setOffset] = React.useState(210);
	const [charEnded, setCharEnded] = React.useState(false);
	const marvelService = new MarvelService();
	const itemRefs = React.useRef([]);

	React.useEffect(() => {
		updateCharacters();
	}, []);

	const onCharListLoaded = (newCharList) => {
		let ended = false;
		if (newCharList.length < 9) {
			ended = true
		}

		setCharList(charList => [...charList, ...newCharList]);
		setLoading(loading => false);
		setError(error => false);
		setNewItemLoading(newItemLoading => false);
		setOffset(offset => offset + 9);
		setCharEnded(ended => ended);
	}

	const onError = () => {
		setLoading(false);
		setError(true);
	}

	const updateCharacters = (offset) => {
		onNewItemLoading();

		marvelService.getAllCharacters(offset)
			.then(onCharListLoaded)
			.catch(onError);
	}

	const onNewItemLoading = () => {
		setNewItemLoading(true);
	}

	const focusOnItem = (id) => {
		itemRefs.current.forEach(item => item.classList.remove('char__item_selected'));
		itemRefs.current[id].classList.add('char__item_selected');
		itemRefs.current[id].focus();
	}

	const createItemList = () => {
		const chars = charList.map((item, i) => {
			const imageExist = marvelService.imageExist(item);

			return (<li
						className="char__item"
						key={item.id}
						onClick={() => {
							focusOnItem(i);
							props.onCharSelected(item.id);
						}}
						onKeyPress={(e) => {
							if (e.key === ' ' || e.key === 'Enter') {
								props.onCharSelected(item.id);
								focusOnItem(i);
							}
						}}
						ref={(el) => itemRefs.current[i] = el}
						tabIndex="0">
							<img
							style={imageExist ? {'objectFit': "contain"} : {'objectFit': "unset"}}
							src={item.thumbnail}
							alt={item.name}/>
							<div className="char__name">{item.name}</div>
					</li>)
		});

		return (
			<ul className="char__grid">
				{chars}		
			</ul>
		);
	}

	const itemList = createItemList();
	const errorMessage = error ? <ErrorMessage/> : null;
	const spinner = loading ? <Spinner/> : null;

	return (
		<div className="char__list">
			{errorMessage || spinner || itemList}
			<button className="button button__main button__long"
				disabled={newItemLoading}
				onClick={() => updateCharacters(offset)}
				style={{'display' : charEnded ? 'none' : 'block'}}
			>
				<div className="inner">load more</div>
			</button>
		</div>
	);
}

CharList.propTypes = {
    onCharSelected: PropTypes.func.isRequired
}

export default CharList;