import React from 'react';
import { Helmet } from "react-helmet";

import decoration from '../resources/img/vision.png';

import RandomChar from "../components/randomChar/RandomChar";
import CharList from '../components/charList/CharList';
import CharInfo from "../components/charInfo/CharInfo";
import ErrorBoundary from '../components/errorBoundary/ErrorBoundary';
import CharSearchForm from '../components/CharSearchForm/CharSearchForm';

const MainPage = () => {
	const [selectedChar, setSelectedChar] = React.useState(null);

	const onCharSelected = (id) => {
		setSelectedChar(id);
	}

	return (
		<>
			<Helmet>
				<meta 
					name="description"
					content="Marvel information portal"/>
				<title>Marvel information portal</title>
			</Helmet>
			<ErrorBoundary>
				<RandomChar/>
			</ErrorBoundary>
			<div className="char__content">
				<CharList onCharSelected={onCharSelected}/>
				<aside className="char__aside">
					<ErrorBoundary>
						<CharInfo charId={selectedChar}/>
					</ErrorBoundary>
					<CharSearchForm/>
				</aside>
			</div>
			<img className="bg-decoration" src={decoration} alt="vision"/>
		</>
	);
}

export default MainPage;