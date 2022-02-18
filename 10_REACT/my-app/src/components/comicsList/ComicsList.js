import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import useMarvelService from '../../services/MarvelService'

import './comicsList.scss';

const ComicsList = (props) => {

    const [comicsList, setComicsList] = useState([])
    const [newItemLoading, setNewItemLoading] = useState(false)
    const [offset, setOffset] = useState(200)
    const [comicsEnded, setComicsEnded] = useState(false)
    //Достаем из кастомного хука useMarvelService свойства и методы:
    const {loading, error, getAllComics} = useMarvelService();

    //Когда у нас компонент отрендерился мы запускаем метод запроса на сервер (без аргумента, это значит у нас подставляется дефолтное значение оффсета) и подгружаем перонажей
    //useEffect запускается уже после рендера, поэтому мы вызываем ее еще до того, как прописали ее как стрелочную функцию

    useEffect(() => {
        onRequest(offset, true)
    }, [])

    useEffect(() => {
        window.addEventListener('scroll', scrollHandler)
        return function() {
            window.removeEventListener('scroll', scrollHandler)
        }      
    })

    //Создаем метод запроса на сервер и подгружаем персонажей с тем отступом, который мы зададим
    const onRequest = (offset, initial) => {

        //Если мы в onRequest вторым аргументов передадим initial: true то мы говорим коду что это первичная загрузка. Но если идет повторная загрузка то initial: false и 
        initial ? setNewItemLoading(false) : setNewItemLoading(true)

        getAllComics(offset)
            .then(onComicsListLoaded)
    }

    //Когда у нас страница загружается первый раз и этот метод запускается впервые, у нас в ...charList пустой массив поэтому он ни во что не развернеться только ...newCharList. В последующем у нас в ...charList будут старые элементы а в ...newCharList новые элементы которые будут складываться в один массив и далее этот метод пойдет в формирование верстки
    const onComicsListLoaded = (newComicsList) => {

        //Проверяем, если у нас возвращается меньше 8 комиксов(последние) тогда присваиваем стейту charEnded значение true посредством переменной ended
        let ended = false;
        if (newComicsList.length < 8 ) {
            ended = true;
        }

        //у нас новый стейт charList будет зависеть от предудщего charList и для того чтобы отрендерить новых персонажей мы в массив charList через spread оператор складываем сперва массив предыдущих персонажей и массив новых персонажей. Так же увеличиваем наш оффсет на 9 при каждом новом запросе на сервер

        setComicsList(comicsList => [...comicsList, ...newComicsList])
        setNewItemLoading(newItemLoading => false)
        setOffset(offset => offset + 12)
        setComicsEnded(comicsEnded => ended)
    }



    function renderComicsList (arr) {

        //Чтобы tabIndex был для каждого элемента свой как счетчик, потом в атрибут помещаем: tabIndex={counter = counter + 1}
        // let counter = 0

        const items = arr.map((item, i) => {

            //Проверяем если с сервера приходит изображение заглушка то мы в переменную прописываем определенный стиль и потом эту переменную заносив в тег инлайн стилей картинки
            let imgStyle = {'objectFit' : 'cover'};
            if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle = {'objectFit' : 'unset'};
            }

            //Присваиваем ключ и id для каждого элемента и при клике на элемент li вытаскиваем метод onCharSelected (с аргументом id нужного элемента) из пропсов переданных из app. То есть мы по клику вытаскиваем id того элемента на который мы кликнули и передаем наверх в App и там устанавливаем его в state selectedChar

            return (
                <li 
                    tabIndex={0}
                    className="comics__item" 
                    key={i}>
                    <Link to={`/comics/${item.id}`}>    
                        <img src={item.thumbnail} alt="abyss" style={imgStyle}/>
                        <div className="comics__item">{item.title}</div>
                        <div className="comics__item-price">{item.price}</div>
                    </Link>
                </li>
            )
        })
        return (
            <ul className="comics__grid">
                {items}
            </ul>
        )
    }

    //В кнопке Load more мы изменяем стиль там, что если у нас еще идет дозагрузка персонажей, у нас атрибут disabled становится = true так как стейт newItemLoading = true когда происзодит дозагрузка персов и стиль становится none (кнопка исчезает) когда мы загрузили всех персонажей (charEnded стало = true), в обратном случае у нас кнопка видима. В onClick исп стрелочную ф-ю для того чтбы можно было передавать аргумент

    const items = renderComicsList(comicsList)

    //В spinner мы проверяем если у нас есть загрузка и это НЕ загрузка новых персонажей, то есть мы показываем спинер ТОЛЬКО при изначальной загрузке персонажей
    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading && !newItemLoading ? <Spinner/> : null;

    const scrollHandler = (e) => {
    if (e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 1) {
        onRequest(offset)
        console.log(offset)
    }
    // console.log('scrollHeight', e.target.documentElement.scrollHeight)
    // console.log('scrollHeight', e.target.documentElement.scrollTop)
    // console.log('scrollHeight', window.innerHeight)
    }

    return (
        <div className="comics__list">
            {errorMessage}
            {spinner}
            {items}
            <button 
                className="button button__main button__long"
                disabled={newItemLoading}
                style={{'display': comicsEnded ? 'none' : 'block'}}
                onClick={() => onRequest(offset)}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}




export default ComicsList;