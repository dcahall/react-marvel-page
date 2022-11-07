import React from 'react';
import PropTypes from 'prop-types'

import './charList.scss';
import useMarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';
import onKey from '../../utils/onKeyPress';

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

const 					CharList = (props) => {
	const [charList, setCharList] = React.useState([]);
	const [newItemLoading, setNewItemLoading] = React.useState(false);
	const [offset, setOffset] = React.useState(210);
	const [charEnded, setCharEnded] = React.useState(false);
	const {getAllCharacters, imageExist, setProcess, process} = useMarvelService();
	const itemRefs = React.useRef([]);

	React.useEffect(() => {
		updateCharacters(offset, true);
		//eslint-disable-next-line
	}, []);

	const onCharListLoaded = (newCharList) => {
		let ended = false;
		if (newCharList.length < 9) {
			ended = true
		}

		setCharList(charList => [...charList, ...newCharList]);
		setNewItemLoading(newItemLoading => false);
		setOffset(offset => offset + 9);
		setCharEnded(ended);
	}

	const updateCharacters = (offset, initial) => {
		initial ? setNewItemLoading(false) : setNewItemLoading(true);
		
		getAllCharacters(offset)
			.then(onCharListLoaded)
			.then(() => setProcess('confirmed'))
	}

	const focusOnItem = (id) => {
		itemRefs.current.forEach(item => item.classList.remove('char__item_selected'));
		itemRefs.current[id].classList.add('char__item_selected');
		itemRefs.current[id].focus();
	}

	const createItemList = (charList) => {
		const chars = charList.map((item, i) => {
			return (
					<li
						key={item.id}
						className="char__item"
						onClick={() => {
							focusOnItem(i);
							props.onCharSelected(item.id);
						}}
						onKeyPress={(e) => {
							onKey(e, () => props.onCharSelected(item.id), () => focusOnItem(i))
						}}
						ref={(el) => itemRefs.current[i] = el}
						tabIndex="0">
							<img
							style={imageExist(item) ? {'objectFit': "contain"} : {'objectFit': "unset"}}
							src={item.thumbnail}
							alt={item.name}/>
							<div className="char__name">{item.name}</div>
					</li>);
		});

		return (
			<ul className="char__grid">
				{chars}
			</ul>
		);
	}

	const elements = React.useMemo(() => {
		return setContent(process, () => createItemList(charList), newItemLoading);
		//eslint-disable-next-line
	}, [process]);

	return (
		<div className="char__list">
			{elements}
			<button
				className={`button button__main button__long ${newItemLoading ? `button__long_active` : null}`}
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