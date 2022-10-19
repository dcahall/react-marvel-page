import React from 'react';
import PropTypes from 'prop-types';

import Spinner from '../spinner/Spinner';
import Skeleton from '../skeleton/Skeleton';
import ErrorMessage from '../errorMessage/Error.Message';

import './charInfo.scss';
import MarvelService from '../../services/MarvelService';

const CharInfo = (props) => {

	const [char, setChar] = React.useState(null);
	const [loading, setLoading] = React.useState(false);
	const [error, setError] = React.useState(false);
	const marvelService = new MarvelService();

	React.useEffect(() => {
		updateChar();
	}, [])

	React.useEffect(() => {
		updateChar();
	}, [props.charId])

	const updateChar = () => {
		if (!props.charId) {
			return null;
		}

		onCharLoading();
		marvelService.getCharacter(props.charId)
			.then(onCharLoaded)
			.catch(onError);
	}

	const onCharLoaded = (char) => {
		setChar(char);
		setLoading(false);
		setError(false);
	}

	const onError = () => {
		setLoading(false);
		setError(true);
	}

	const onCharLoading = () => {
		setLoading(true);
	}

	const imageExist = char ? marvelService.imageExist(char) : null;
	const errorMessage = error ? <ErrorMessage/> : null;
	const spinner = loading ? <Spinner/> : null;
	const content = char ? <View char={char} imageExist={imageExist} /> : <Skeleton/>;

		return (
			<div className="char__info">
				{errorMessage || spinner || content}
			</div>
		);
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

CharInfo.propTypes = {
	charId: PropTypes.number
}

export default CharInfo;
