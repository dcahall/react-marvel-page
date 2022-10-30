import { BrowserRouter as Router} from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';

import AppHeader from "../appHeader/AppHeader";
import ComicsPage from "../../pages/ComicsPage.js";
import MainPage from "../../pages/MainPage.js";
import Page404 from '../../pages/404.js';
import SingleComicPage from '../../pages/SingleComicPage.js';

const App = () => {
	return (
		<div className="app">
			<Router>
			<AppHeader/>
				<main>
					<Routes>
						<Route path="/" element={<MainPage/>}/>
						<Route path="/comics" element={<ComicsPage/>}/>
						<Route path="/comics/:comicId" element={<SingleComicPage/>}/>
						<Route path="*" element={<Page404/>}/>
					</Routes>
				</main>
			</Router>
		</div>
	);
}

export default App;