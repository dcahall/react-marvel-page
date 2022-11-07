import { Helmet } from "react-helmet";

import AppBanner from "../../components/appBanner/AppBanner";
import './SingleCharPage.scss'

const SingleCharPage = ({data, onNavigate}) => {
	console.log(data, onNavigate);
	const { name, description, thumbnail } = data;

	return (
		<>
			<Helmet>
				<meta 
					name="description"
					content={`Character: ${name} page`}/>
				<title>{name}</title>
			</Helmet>
			<AppBanner/>
			<div className="single-char">
            <img src={thumbnail} alt={name} className="single-char__img"/>
            <div className="single-char__info">
                <h2 className="single-char__name">{name}</h2>
                <p className="single-char__descr">{description}</p>
            </div>
			<h2
				className="single-char__back"
				onClick={onNavigate}
				tabIndex={0}
				onKeyPress={(e) => {
					if (e.key === 'Enter') {
						onNavigate()
					}
				}}>
					Go back
				</h2>
    	    </div>
		</>
	);
}

export default SingleCharPage;