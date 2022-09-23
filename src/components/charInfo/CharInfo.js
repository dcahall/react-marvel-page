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
		if (prevProps.charId != this.props.charId) {
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
	const {name, description, thumbnail, homepage, wiki} = char;

	return (
		<>
			<div className="char__basics">
				<img src={thumbnail} alt={name}/>
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
				<li className="char__comics-item">
					All-Winners Squad: Band of Heroes (2011) #3
				</li>
				<li className="char__comics-item">
					Alpha Flight (1983) #50
				</li>
				<li className="char__comics-item">
					Amazing Spider-Man (1999) #503
				</li>
				<li className="char__comics-item">
					Amazing Spider-Man (1999) #504
				</li>
				<li className="char__comics-item">
					AMAZING SPIDER-MAN VOL. 7: BOOK OF EZEKIEL TPB (Trade Paperback)
				</li>
				<li className="char__comics-item">
					Amazing-Spider-Man: Worldwide Vol. 8 (Trade Paperback)
				</li>
				<li className="char__comics-item">
					Asgardians Of The Galaxy Vol. 2: War Of The Realms (Trade Paperback)
				</li>
				<li className="char__comics-item">
					Vengeance (2011) #4
				</li>
				<li className="char__comics-item">
					Avengers (1963) #1
				</li>
				<li className="char__comics-item">
					Avengers (1996) #1
				</li>
			</ul>
		</>);
}

export default CharInfo;