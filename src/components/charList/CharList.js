import React from 'react'

import './charList.scss';
import MarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/Error.Message';
import Spinner from '../spinner/Spinner';

class CharList extends React.Component {
	state = {
		charList: [],
		loading: true,
		error: false,
		newItemLoading: false,
		offset: 210
	}
	
	marvelService = new MarvelService();

	componentDidMount() {
		this.updateCharacters();
	}

	onCharListLoaded = (newCharList) => {
		this.setState(({offset, charList}) => (
			{
				charList: [...charList, ...newCharList],
				loading: false,
				error: false,
				newItemLoading: false,
				offset: offset + 9,
			}
		));
	}

	onError = () => {
		this.setState({loading: false, error: true});
	}

	updateCharacters = (offset) => {
		this.onNewItemLoading();

		this.marvelService
		.getAllCharacters(offset)
		.then(this.onCharListLoaded)
		.catch(this.onError);
	}

	onNewItemLoading = () => {
		this.setState({newItemLoading: true});
	}

	createItemList = () => {
		const charList = this.state.charList.map(item => {
			const imageExist = this.marvelService.imageExist(item);

			return (<li className="char__item" key={item.id} onClick={() => this.props.onCharSelected(item.id)}>
						<img
						style={imageExist ? {'objectFit': "contain"} : {'objectFit': "unset"}}
						src={item.thumbnail}
						alt={item.name}/>
						<div className="char__name">{item.name}</div>
					</li>)
		});
		return (
			<ul className="char__grid">
				{charList}		
			</ul>
		);
	}

	render() {
		const itemList = this.createItemList();

		const {loading, error, newItemLoading, offset} = this.state;
		const errorMessage = error ? <ErrorMessage/> : null;
		const spinner = loading ? <Spinner/> : null;

		return (
			<div className="char__list">
				{errorMessage || spinner || itemList}
				<button className="button button__main button__long">
					<div
						className="inner"
						disabled={newItemLoading}
						onClick={() => this.updateCharacters(offset)}
						onScroll={(e) => console.log(e)}>
						load more
					</div>
				</button>
			</div>
		);
	}
}

export default CharList;