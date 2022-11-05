import React from 'react';
import PropTypes from 'prop-types'
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import './charList.scss';
import useMarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';

const CharList = (props) => {
	const [charList, setCharList] = React.useState([]);
	const [newItemLoading, setNewItemLoading] = React.useState(false);
	const [offset, setOffset] = React.useState(210);
	const [charEnded, setCharEnded] = React.useState(false);
	const {loading, error, getAllCharacters, imageExist} = useMarvelService();
	const itemRefs = React.useRef([]);

	React.useEffect(() => {
		updateCharacters(offset, true);
	}, []);

	const onCharListLoaded = (newCharList) => {
		let ended = false;
		if (newCharList.length < 9) {
			ended = true
		}

		setCharList(charList => [...charList, ...newCharList]);
		setNewItemLoading(newItemLoading => false);
		setOffset(offset => offset + 9);
		setCharEnded(ended => ended);
	}

	const updateCharacters = (offset, initial) => {
		initial ? setNewItemLoading(false) : setNewItemLoading(true);
		
		getAllCharacters(offset)
			.then(onCharListLoaded)
	}

	const focusOnItem = (id) => {
		itemRefs.current.forEach(item => item.classList.remove('char__item_selected'));
		itemRefs.current[id].classList.add('char__item_selected');
		itemRefs.current[id].focus();
	}

	const createItemList = () => {
		const chars = charList.map((item, i) => {
			return (
					<CSSTransition key={item.id} timeout={500} classNames="char__item">
						<li
							className="char__item"
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
								style={imageExist(item) ? {'objectFit': "contain"} : {'objectFit': "unset"}}
								src={item.thumbnail}
								alt={item.name}/>
								<div className="char__name">{item.name}</div>
						</li>
					</CSSTransition>);
		});

		return (
			<TransitionGroup component={'ul'} className="char__grid">
				{chars}
			</TransitionGroup>
		);
	}

	const itemList = createItemList();
	const errorMessage = error ? <ErrorMessage/> : null;
	const spinner = loading && !newItemLoading ? <Spinner/> : null;

	return (
		<div className="char__list">
			{ errorMessage }
			{ spinner }
			{ itemList}
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