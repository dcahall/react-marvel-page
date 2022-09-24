import React from 'react';

import Spinner from '../spinner/Spinner';
import Skeleton from '../skeleton/Skeleton';
import ErrorMessage from '../errorMessage/Error.Message';

import './charInfo.scss';
import MarvelService from '../../services/MarvelService';

class CharInfo extends React.Component {

	constructor(props) {
		super(props);
		this.state={
			char: null,
			loading: false,
			error: false
		}
	}

	marvelService = new MarvelService();

	componentDidMount() {
		this.updateChar();
	}

	updateChar = () => {
		const {charId} = this.props;
		if (!charId) {
			return null;
		}

		this.onCharLoading();
		this.marvelService.getCharacter(charId)
		.then(this.onCharLoaded)
		.catch(this.onError)
	}

	componentDidUpdate(prevProps) {
		if (prevProps.charId !== this.props.charId) {
			this.updateChar();
		}
	}

	onCharLoaded = (char) => {
		this.setState({char, loading: false, error: false});
	}

	onError = () => {
		this.setState({
			loading: false,
			error: true
		})
	}

	onCharLoading = () => {
		this.setState({loading: true});
	}

	render() {
		const {char, loading, error} = this.state;

		const imageExist = char ? this.marvelService.imageExist(char) : null;
		const errorMessage = error ? <ErrorMessage/> : null;
		const spinner = loading ? <Spinner/> : null;
		const content = char ? <View char={char} imageExist={imageExist} /> : <Skeleton/>;

		return (
			<div className="char__info">
				{errorMessage || spinner || content}
			</div>
		);
	}
}

const View = ({char, imageExist}) => {
	const {name, description, thumbnail, homepage, wiki, comics} = char;

	return (
		<>
			<div className="char__basics">
				<img
					src={thumbnail}
					alt={name}
					style={imageExist ? {"objectFit" : 'cover'} : {"objectFit" : 'contain'}}
				/>
				<div>
					<div className="char__info-name">{name}</div>
					<div className="char__btns">
						<a href={homepage} className="button button__main">
							<div className="inner">homepage</div>
						</a>
						<a href={wiki} className="button button__secondary">
							<div className="inner">Wiki</div>
						</a>
					</div>
				</div>
			</div>
			<div className="char__descr">{description}</div>
			<div className="char__comics">Comics:</div>
			<ul className="char__comics-list">
				{ comics.length
					? comics.map((item, i) => {
						return (
							<li className="char__comics-item" key={i}>
								{item.name}
							</li>
						);
					})
					: 'There are no comics featuring this character.'
				}
			</ul>
		</>);
}

export default CharInfo;

// Если комиксов нет добавить заглушку
// картику сделать ковер