import React from 'react'
import { BrowserRouter as Router} from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';

import AppHeader from "../appHeader/AppHeader";
import Spinner from '../spinner/Spinner';
import ComicPage from '../../pages/singleComicPage/SingleComicPage.js';
import CharPage from '../../pages/singleCharPage/SingleCharPage.js';
import withItemPage from '../../pages/withItemPage';

const MainPage = React.lazy(() => import("../../pages/MainPage.js"));
const ComicsPage = React.lazy(() => import("../../pages/ComicsPage.js"));
const Page404 = React.lazy(() => import("../../pages/404.js"));

const SingleComicPage = withItemPage(ComicPage, 'comic');
const SingleCharPage = withItemPage(CharPage, 'character');



const App = () => {

	return (
		<div className="app">
			<Router>
			<AppHeader/>
				<main>
					<React.Suspense fallback={<Spinner/>}>
						<Routes>
							<Route path="/" element={<MainPage/>}/>
							<Route path="/comics" element={<ComicsPage/>}/>
							<Route path="/comics/:uniqId" element={<SingleComicPage/>}/>
							<Route path="/characters/:uniqId" element={<SingleCharPage/>}/>
							<Route path="*" element={<Page404/>}/>
						</Routes>
					</React.Suspense>
				</main>
			</Router>
		</div>
	);
}

export default App;