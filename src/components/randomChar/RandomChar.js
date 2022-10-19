import React from 'react';

import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/Error.Message'

import mjolnir from '../../resources/img/mjolnir.png';
import './randomChar.scss';


const RandomChar = () => {
	
	const [char, setChar] = React.useState({});
	const [loading, setLoading] = React.useState(true);
	const [error, setError] = React.useState(false);
	const marvelService = new MarvelService();
	let   timerId;

	React.useEffect(() => {
		// timerId = setInterval(updateChar, 3000);

		updateChar();
		// return (() => clearInterval(timerId));	
	}, []);

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

	const onRandomChar = () =>  {
		clearInterval(timerId);
		updateChar();
	}

	const updateChar = () => {
		const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
		
		onCharLoading();
		marvelService.getCharacter(id)
			.then(onCharLoaded)
			.catch(onError);
	}

	const errorMessage = error ? <ErrorMessage/> : null;
	const spinner = loading ? <Spinner/> : null;
	const imageExist = marvelService.imageExist(char);

	return (
		<div className="randomchar">
			{errorMessage || spinner || <View char={char} imageExist={imageExist}/>}
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