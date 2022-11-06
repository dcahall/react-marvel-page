import { Helmet } from 'react-helmet';

import ComicsList from '../components/comicsList/ComicsList';
import AppBanner from '../components/appBanner/AppBanner';

const ComicsPage = () => {
	return (
		<>
			<Helmet>
				<meta 
					name="description"
					content="This our marvel comics page"/>
				<title>Marvel Comics</title>
			</Helmet>
			<AppBanner/>
			<ComicsList/>
		</>
	);
}

export default ComicsPage;