import React from 'react';
import PropTypes from 'prop-types';

import Spinner from '../spinner/Spinner';
import Skeleton from '../skeleton/Skeleton';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './charInfo.scss';
import useMarvelService from '../../services/MarvelService';

const CharInfo = (props) => {

	const [char, setChar] = React.useState(null);
	const {loading, error, getCharacter, imageExist, clearError} = useMarvelService();

	React.useEffect(() => {
		updateChar();
	}, [props.charId])

	const updateChar = () => {
		if (!props.charId) {
			return null;
		}

		getCharacter(props.charId)
			.then(onCharLoaded)
	}

	const onCharLoaded = (char) => {
		clearError();
		setChar(char);
	}

	const imageEx = char ? imageExist(char) : null;
	const skeleton = char ? null : <Skeleton/>
	const errorMessage = error ? <ErrorMessage/> : null;
	const spinner = loading ? <Spinner/> : null;
	const content = char ? <View char={char} imageExist={imageEx} /> : null;

	return (
		<div className="char__info">
			{errorMessage || skeleton || spinner || content}
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
