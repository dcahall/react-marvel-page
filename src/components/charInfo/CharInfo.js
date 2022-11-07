import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './charInfo.scss';

import useMarvelService from '../../services/MarvelService';
import setContent from '../../utils/setContent';

const CharInfo = (props) => {

	const [char, setChar] = React.useState(null);
	const {getCharacter, imageExist, setProcess, process} = useMarvelService();

	React.useEffect(() => {
		updateChar();
		//eslint-disable-next-line
	}, [props.charId])

	const updateChar = () => {
		if (!props.charId) {
			return null;
		}

		getCharacter(props.charId)
			.then(onCharLoaded)

			.then(() => setProcess('confirmed'));
	}

	const onCharLoaded = (char) => {
		setChar(char);
	}

	return (
		<div className="char__info">
			{setContent(process, () => <View data={char} imageExist={imageExist}/>)}
		</div>
	);
}

const View = ({data, imageExist}) => {
	const {name, description, thumbnail, homepage, wiki, comics} = data;
	const imageEx = imageExist(data);

	return (
		<>
			<div className="char__basics">
				<img
					src={thumbnail}
					alt={name}
					style={imageEx ? {"objectFit" : 'cover'} : {"objectFit" : 'contain'}}
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
						const comicUrl = item.resourceURI;
						const uniqId = comicUrl.slice(comicUrl.lastIndexOf('/') + 1);

						return (
							<li className="char__comics-item" key={i}>
								<Link to={`/comics/${uniqId}`}>{item.name}</Link>
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
