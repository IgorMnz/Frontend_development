//Мы не наследуем от Component так как мы класс на чистом JS
import { useHttp } from '../hooks/http.hook'


const useMarvelService = () => {
    //Вытаскиваем все что есть в хуке useHttp (деструктурируем объект)
    const {request, clearError, process, setProcess} = useHttp();


    const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    const _apiKey ='apikey=be23d48578ce8a8865c373b78faaa289';
    const _baseOffset = 110;

    const getAllComics = async (offset = _baseOffset) => {
        const res = await request(`${_apiBase}comics?limit=12&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformComics);
    } 

    const getComic = async (id) => {
        const res = await request(`${_apiBase}comics/${id}?${_apiKey}`);
        return _transformComics(res.data.results[0]);
    }

    //Для того чтобы потом можно было вызывать функцию с необходимым нам оффсетом, мы передаем этот оффсет как аргумент и по умолчанию он будет равным тому, который мы установили выше
    const getAllCharacters = async (offset = _baseOffset) => {
        const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformCharacter);
    }

    const getCharacter = async (id) => {
        const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
        return _transformCharacter(res.data.results[0]);
    }

    const getCharacterByName = async (name) => {
        const res = await request(`${_apiBase}characters?name=${name}&${_apiKey}`);
        return res.data.results.map(_transformCharacter);
    }

    const _transformComics = (comics) => {
        return {
            id: comics.id,
            title: comics.title,
            description: comics.description || 'There is no description',
            pageCount: comics.pageCount ? `${comics.pageCount} p.` : 'No information about the number of pages',
            thumbnail: comics.thumbnail.path + '.' + comics.thumbnail.extension,
            language: comics.textObjects.language || 'en-us',
            price: comics.prices[0].price ? comics.prices[0].price + '$' : 'NOT AVAILABLE',
            homepage: comics.urls[0].url
        }
    }

    //Если у нас нету описания то возвращается текст что нету описания, а так же ограничение поставили в 200 символов
    const _transformCharacter = (char) => {
        return {
            id: char.id,
            name: char.name,
            description: char.description ? char.description : 'There is no description for this character',
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            comics: char.comics.items.slice(10)
        }
    }

    //Так как useMarvelService тоже наш кастомный хук, мы из него возвращаем свойства и методы
    return {process,
            setProcess, 
            getAllComics, 
            getComic, 
            getAllCharacters, 
            getCharacter, 
            getCharacterByName, 
            clearError}

}

export default useMarvelService;