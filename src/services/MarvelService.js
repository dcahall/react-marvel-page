class MarvelService {
	_apiBase = 'https://gateway.marvel.com:443/v1/public/';
	_apiKey = '&apikey=5b12a982c1966eedf8804dd082260d7a';

	getResource = async (url) => {
		let res = await fetch(url);

		if (!res.ok) {
			throw new Error(`Couldn't fetch ${url}, status ${res.status}`);
		}
		return await res.json();
	}

	getAllCharacters = async () => {
		const fullCharInfo = await this.getResource(`${this._apiBase}characters?limit=9&offset=210&${this._apiKey}`);
		return fullCharInfo.data.results.map(this._transformCharacter);
	}

	getCharacter = async (id) => {
		const fullCharInfo = await this.getResource(`${this._apiBase}characters/${id}?${this._apiKey}`);
		return this._transformCharacter(fullCharInfo.data.results[0]);
	}

	_transformCharacter = (shortCharInfo) => {
		return (
			{
				name: shortCharInfo.name,
				description: shortCharInfo.description ? shortCharInfo.description.slice(0, 225) + '...' : "There is no description for this character",
				thumbnail: shortCharInfo.thumbnail.path + '.' + shortCharInfo.thumbnail.extension,
				homepage: shortCharInfo.urls[0].url,
				wiki: shortCharInfo.urls[1].url,
				id: shortCharInfo.id,
			}
		);
	}

	imageExist = (char) => {
		return (char.thumbnail === "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
				? false
				: true);
	}
}

export default MarvelService;