import { useHttp } from "../hooks/http.hook";

const useMarvelService = () => {
	const {request, setProcess, process } = useHttp();

	const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
	const _apiKey = '&apikey=5b12a982c1966eedf8804dd082260d7a';
	const _baseOffset = 210;

	const getAllCharacters = async (offset = _baseOffset) => {
		const fullCharInfo = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);

		return fullCharInfo.data.results.map(_transformCharacter);
	}

	const getCharacter = async (id) => {
		const fullCharInfo = await request(`${_apiBase}characters/${id}?${_apiKey}`);

		return fullCharInfo ? _transformCharacter(fullCharInfo.data.results[0]) : null;
	}

	const getFullCharacter = async (id) => {
		const fullCharInfo = await request(`${_apiBase}characters/${id}?${_apiKey}`);

		return fullCharInfo ? _transformFullCharacter(fullCharInfo.data.results[0]) : null;
	}

	const getCharacterByName = async (name) => {
		const fullCharInfo = await request(`${_apiBase}characters?nameStartsWith=${name}${_apiKey}`);

		return fullCharInfo.data.results.length ? _transformCharacter(fullCharInfo.data.results[0]) : {};
	}

	const getAllComics = async (offset = 0) => {
        const res = await request(`${_apiBase}comics?orderBy=issueNumber&limit=8&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformComics);
    }

    const getComic = async (id) => {
        const res = await request(`${_apiBase}comics/${id}?${_apiKey}`);
        return _transformComics(res.data.results[0]);
    }

	const _transformCharacter = (shortCharInfo) => {
		return (
			{
				name: shortCharInfo.name,
				description: shortCharInfo.description ? shortCharInfo.description.slice(0, 160) + '...' : "There is no description for this character",
				thumbnail: shortCharInfo.thumbnail.path + '.' + shortCharInfo.thumbnail.extension,
				homepage: shortCharInfo.urls[0].url,
				wiki: shortCharInfo.urls[1].url,
				comics: shortCharInfo.comics.items.slice(0, 10),
				id: shortCharInfo.id,
			}
		);
	}

	const _transformFullCharacter = (shortCharInfo) => {
		return (
			{
				name: shortCharInfo.name,
				description: shortCharInfo.description ? shortCharInfo.description : "There is no description for this character",
				thumbnail: shortCharInfo.thumbnail.path + '.' + shortCharInfo.thumbnail.extension,
				id: shortCharInfo.id,
			}
		);
	}

	const _transformComics = (comics) => {
        return {
            id: comics.id,
            title: comics.title,
            description: comics.description || 'There is no description',
            pageCount: comics.pageCount ? `${comics.pageCount} p.` : 'No information about the number of pages',
            thumbnail: comics.thumbnail.path + '.' + comics.thumbnail.extension,
            language: comics.textObjects.language || 'en-us',
            price: comics.prices.price ? `${comics.prices.price}$` : 'not available'
        }
    }

	const imageExist = (char) => {
		return (char.thumbnail === "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
				? false
				: true);
	}

	return {
			getFullCharacter,
			getAllCharacters,
			getCharacter,
			imageExist,
			getAllComics,
			getComic,
			getCharacterByName,
			setProcess,
			process};
}

export default useMarvelService;