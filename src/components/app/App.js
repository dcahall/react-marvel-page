import { BrowserRouter as Router} from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';

import AppHeader from "../appHeader/AppHeader";
import ComicsPage from "../../pages/ComicsPage";
import MainPage from "../../pages/MainPage";

const App = () => {
	return (
		<div className="app">
			<Router>
			<AppHeader/>
				<main>
					<Routes>
						<Route path="/" element={<MainPage/>}/>
						<Route path="/comics" element={<ComicsPage/>}/>
					</Routes>
				</main>
			</Router>
		</div>
	);
}

export default App;