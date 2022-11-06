import { Helmet } from "react-helmet";

import './SingleComicPage.scss';

const SingleComicPage = ({data, onNavigate}) => {
	const { title, description, pageCount, thumbnail, language, price} = data;

	return (
		
        <div className="single-comic">
			<Helmet>
				<meta 
					name="description"
					content={`Comics: ${title} page`}/>
				<title>{title}</title>
			</Helmet>
            <img src={thumbnail} alt={title} className="single-comic__img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{title}</h2>
                <p className="single-comic__descr">{description}</p>
                <p className="single-comic__descr">{pageCount}</p>
                <p className="single-comic__descr">Language: {language}</p>
                <div className="single-comic__price">{price}</div>
            </div>
			<h2
				className="single-comic__back"
				onClick={onNavigate}>Go back</h2>
        </div>
	);
}

export default SingleComicPage;