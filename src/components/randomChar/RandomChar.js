import React from 'react';

import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage'

import mjolnir from '../../resources/img/mjolnir.png';
import './randomChar.scss';


const RandomChar = () => {
	
	const [char, setChar] = React.useState({});
	const {loading, error, getCharacter, imageExist, clearError} = useMarvelService();
	let   timerId;

	React.useEffect(() => {
		// timerId = setInterval(updateChar, 60000);

		updateChar();
		// return (() => clearInterval(timerId));	
	}, []);

	const onCharLoaded = (char) => {
		setChar(char);
	}

	const onRandomChar = () =>  {
		clearInterval(timerId);
		updateChar();
	}

	const updateChar = () => {
		const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
		
		clearError();
		getCharacter(id)
			.then(onCharLoaded)
			// .catch(onError);
	}

	const errorMessage = error ? <ErrorMessage/> : null;
	const spinner = loading ? <Spinner/> : null;
	const imageEx = char ? imageExist(char) : null;

	return (
		<div className="randomchar">
			{errorMessage || spinner || <View char={char} imageExist={imageEx}/>}
			<div className="randomchar__static">
				<p className="randomchar__title">
					Random character for today!<br/>
					Do you want to get to know him better?
				</p>
				<p className="randomchar__title">
					Or choose another one
				</p>
				<button className="button button__main">
					<div className="inner" onClick={onRandomChar}>try it</div>
				</button>
				<img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
			</div>
		</div>
	);
}

const View = ({char, imageExist}) => {
	const {name, description, thumbnail, homepage, wiki} = char;
	const clazz = imageExist ? "randomchar__img__cover" : "randomchar__img__contain";

	return (
		<div className="randomchar__block">
			<img src={thumbnail} alt="Random character" className={clazz}/>
			<div className="randomchar__info">
				<p className="randomchar__name">{name}</p>
				<p className="randomchar__descr">{description}</p>
				<div className="randomchar__btns">
					<a href={homepage} className="button button__main">
						<div className="inner">homepage</div>
					</a>
					<a href={wiki} className="button button__secondary">
						<div className="inner">Wiki</div>
					</a>
				</div>
			</div>
		</div>
	);
}

export default RandomChar;