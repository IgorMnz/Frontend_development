import { useState, useEffect } from 'react';
import propTypes from 'prop-types';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import MarvelService from '../../services/MarvelService'

import './charList.scss';

const CharList = (props) => {

    const [charList, setCharList] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [newItemLoading, setNewItemLoading] = useState(false)
    const [offset, setOffset] = useState(210)
    const [charEnded, setCharEnded] = useState(false)

    const marvelService = new MarvelService();

    //Когда у нас компонент отрендерился мы запускаем метод запроса на сервер (без аргумента, это значит у нас подставляется дефолтное значение оффсета) и подгружаем перонажей
    //useEffect запускается уже после рендера, поэтому мы вызываем ее еще до того, как прописали ее как стрелочную функцию

    useEffect(() => {
        onRequest()
    }, [])

    //Создаем метод запроса на сервер и подгружаем персонажей с тем отступом, который мы зададим
    const onRequest = (offset) => {
        onCharListLoading()
        marvelService
            .getAllCharacters(offset)
            .then(onCharListLoaded)
            .catch(onError)
    }

    //Этот метод переключает наш стейт загрузки новых данных newItemLoading в true 
    const onCharListLoading = () => {
        setNewItemLoading(true)
    }

    //Когда у нас страница загружается первый раз и этот метод запускается впервые, у нас в ...charList пустой массив поэтому он ни во что не развернеться только ...newCharList. В последующем у нас в ...charList будут старые элементы а в ...newCharList новые элементы которые будут складываться в один массив и далее этот метод пойдет в формирование верстки
    const onCharListLoaded = (newCharList) => {

        //Проверяем, если у нас возвращается меньше 9 персонажей(последние) тогда присваиваем стейту charEnded значение true посредством переменной ended
        let ended = false;
        if (newCharList.length < 9 ) {
            ended = true;
        }

        //у нас новый стейт charList будет зависеть от предудщего charList и для того чтобы отрендерить новых персонажей мы в массив charList через spread оператор складываем сперва массив предыдущих персонажей и массив новых персонажей. Так же увеличиваем наш оффсет на 9 при каждом новом запросе на сервер

        setCharList(charList => [...charList, ...newCharList])
        setLoading(loading => false)
        setNewItemLoading(newItemLoading => false)
        setOffset(offset => offset + 9)
        setCharEnded(charEnded => ended)
    }

    const onError = () => {
        setError(true)
        setLoading(loading => false)
    }

    function renderCharList (arr) {

        //Чтобы tabIndex был для каждого элемента свой как счетчик, потом в атрибут помещаем: tabIndex={counter = counter + 1}
        // let counter = 0

        const item = arr.map((item, i) => {

            //Проверяем если с сервера приходит изображение заглушка то мы в переменную прописываем определенный стиль и потом эту переменную заносив в тег инлайн стилей картинки
            let imgStyle = {'objectFit' : 'cover'};
            if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle = {'objectFit' : 'unset'};
            }

            //Присваиваем ключ и id для каждого элемента и при клике на элемент li вытаскиваем метод onCharSelected (с аргументом id нужного элемента) из пропсов переданных из app. То есть мы по клику вытаскиваем id того элемента на который мы кликнули и передаем наверх в App и там устанавливаем его в state selectedChar
            
            return (
                <li 
                    tabIndex={0}
                    className="char__item" 
                    key={item.id}
                    onClick={() => {
                        props.onCharSelected(item.id)}}
                    onKeyPress={(e) => {
                        if (e.key === ' ' || e.key === "Enter") {
                            props.onCharSelected(item.id)
                        }
                    }}>
                        <img src={item.thumbnail} alt="abyss" style={imgStyle}/>
                        <div className="char__name">{item.name}</div>
                </li>
            )
        })
        return (
            <ul className="char__grid">
                {item}
            </ul>
        )
    }

    //В кнопке Load more мы изменяем стиль там, что если у нас еще идет дозагрузка персонажей, у нас атрибут disabled становится = true так как стейт newItemLoading = true когда происзодит дозагрузка персов и стиль становится none (кнопка исчезает) когда мы загрузили всех персонажей (charEnded стало = true), в обратном случае у нас кнопка видима. В onClick исп стрелочную ф-ю для того чтбы можно было передавать аргумент

        const items = renderCharList(charList)

        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error) ? items : null
        
        return (
            <div className="char__list">
                {errorMessage}
                {spinner}
                {content}
                <button 
                    className="button button__main button__long"
                    disabled={newItemLoading}
                    style={{'display': charEnded ? 'none' : 'block'}}
                    onClick={() => onRequest(offset)}>
                    <div className="inner">load more</div>
                </button>
            </div>
        )
}

CharList.propTypes = {
    onCharSelected: propTypes.func.isRequired
}

export default CharList;