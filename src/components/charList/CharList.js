import React from 'react'

import './charList.scss';
import MarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/Error.Message';
import Spinner from '../spinner/Spinner';

class CharList extends React.Component {
	state = {
		charList: [],
		loading: true,
		error: false
	}
	
	marvelService = new MarvelService();

	componentDidMount() {
		this.updateCharacters();
	}

	onCharLoaded = (charList) => {
		this.setState({charList, loading: false, error: false})
	}

	onError = () => {
		this.setState({loading: false, error: true});
	}

	updateCharacters = () => {
		this.marvelService
		.getAllCharacters()
		.then(this.onCharLoaded)
		.catch(this.onError);
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

		const {loading, error} = this.state;
		const errorMessage = error ? <ErrorMessage/> : null;
		const spinner = loading ? <Spinner/> : null;

		return (
			<div className="char__list">
				{errorMessage || spinner || itemList}
				<button className="button button__main button__long">
					<div className="inner">load more</div>
				</button>
			</div>
		);
	}
}

export default CharList;