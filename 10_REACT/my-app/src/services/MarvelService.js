//Мы не наследуем от Component так как мы класс на чистом JS
class MarvelService {
    _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    _apiKey ='apikey=be23d48578ce8a8865c373b78faaa289';

    getResources = async (url) => {
        let res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status} `)
        }

        return await res.json();
    }

    getAllCharacters = async () => {
        const res = await this.getResources(`${this._apiBase}characters?limit=9&offset=210&${this._apiKey}`);
        return res.data.results.map(this._transformCharacter);
    }

    getCharacter = async (id) => {
        const res = await this.getResources(`${this._apiBase}characters/${id}?&${this._apiKey}`);
        return this._transformCharacter(res.data.results[0]);
    }

    //Если у нас нету описания то возвращается текст что нету описания, а так же ограничение в 200 символов
    _transformCharacter = (char) => {

        return {
            name: char.name,
            description: char.description ? `${char.description.slice(0, 200)}...` : 'There is no description for this character...',
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url
        }
    }

}

export default MarvelService;