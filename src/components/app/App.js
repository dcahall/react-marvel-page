import React from 'react'
import { BrowserRouter as Router} from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';

import AppHeader from "../appHeader/AppHeader";
import Spinner from '../spinner/Spinner';

const MainPage = React.lazy(() => import("../../pages/MainPage.js"));
const ComicsPage = React.lazy(() => import("../../pages/ComicsPage.js"));
const Page404 = React.lazy(() => import("../../pages/404.js"));
const SingleComicPage = React.lazy(() => import("../../pages/SingleComicPage.js"));


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
							<Route path="/comics/:comicId" element={<SingleComicPage/>}/>
							<Route path="*" element={<Page404/>}/>
						</Routes>
					</React.Suspense>
				</main>
			</Router>
		</div>
	);
}

export default App;