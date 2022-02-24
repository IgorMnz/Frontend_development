import { useState, useEffect } from 'react';
import propTypes from 'prop-types';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import useMarvelService from '../../services/MarvelService'
import {CSSTransition, TransitionGroup} from 'react-transition-group';

import './charList.scss';

const CharList = (props) => {

    const [charList, setCharList] = useState([])
    const [newItemLoading, setNewItemLoading] = useState(false)
    const [offset, setOffset] = useState(210)
    const [charEnded, setCharEnded] = useState(false)
    const [add, setAdd] = useState(false)
    //Достаем из кастомного хука useMarvelService свойства и методы:
    const {loading, error, getAllCharacters} = useMarvelService();

    //Когда у нас компонент отрендерился мы запускаем метод запроса на сервер (без аргумента, это значит у нас подставляется дефолтное значение оффсета) и подгружаем перонажей
    //useEffect запускается уже после рендера, поэтому мы вызываем ее еще до того, как прописали ее как стрелочную функцию

    useEffect(() => {
        onRequest(offset, true)
    }, [])

    //Создаем метод запроса на сервер и подгружаем персонажей с тем отступом, который мы зададим
    const onRequest = (offset, initial) => {

        setAdd(false)

        //Если мы в onRequest вторым аргументов передадим initial: true то мы говорим коду что это первичная загрузка. Но если идет повторная загрузка то initial: false и setNewItemLoading переходит в true
        initial ? setNewItemLoading(false) : setNewItemLoading(true)

        getAllCharacters(offset)
            .then(onCharListLoaded)
    }

    //Когда у нас страница загружается первый раз и этот метод запускается впервые, у нас в ...charList пустой массив поэтому он ни во что не развернеться только ...newCharList. В последующем у нас в ...charList будут старые элементы а в ...newCharList новые элементы которые будут складываться в один массив и далее этот метод пойдет в формирование верстки
    const onCharListLoaded = (newCharList) => {

        // //Используем деструктуризацию для выстаскивания свойств из асинхронной функции, поэтому испольузем await и в onCharListLoaded стивим async (так как не знает через сколько код вернет функцию и мы получаем промис)
        // const {logger, secondLog} = await import('./someFunc')
        // logger();

        //Проверяем, если у нас возвращается меньше 9 персонажей(последние) тогда присваиваем стейту charEnded значение true посредством переменной ended
        let ended = false;
        if (newCharList.length < 9 ) {
            ended = true;
        }

        //у нас новый стейт charList будет зависеть от предудщего charList и для того чтобы отрендерить новых персонажей мы в массив charList через spread оператор складываем сперва массив предыдущих персонажей и массив новых персонажей. Так же увеличиваем наш оффсет на 9 при каждом новом запросе на сервер

        setCharList(charList => [...charList, ...newCharList])
        setNewItemLoading(newItemLoading => false)
        setOffset(offset => offset + 9)
        setCharEnded(charEnded => ended)
        setAdd(true)
    }

    function renderCharList (arr) {

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
                <CSSTransition
                    key={item.id}
                    in={add} 
                    timeout={300}
                    classNames='char__item'>
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
                </CSSTransition>
            )
        })
        return (
            <ul className="char__grid">
                <TransitionGroup component={null}>
                    {items}
                </TransitionGroup>
            </ul>
        )
    }

    //В кнопке Load more мы изменяем стиль там, что если у нас еще идет дозагрузка персонажей, у нас атрибут disabled становится = true так как стейт newItemLoading = true когда происзодит дозагрузка персов и стиль становится none (кнопка исчезает) когда мы загрузили всех персонажей (charEnded стало = true), в обратном случае у нас кнопка видима. В onClick исп стрелочную ф-ю для того чтбы можно было передавать аргумент

        const items = renderCharList(charList)

        //В spinner мы проверяем если у нас есть загрузка и это НЕ загрузка новых персонажей, то есть мы показываем спинер ТОЛЬКО при изначальной загрузке персонажей
        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading && !newItemLoading ? <Spinner/> : null;

        // if (loading) {
        //     import('./someFunc')
        //         .then(obj => obj.default())
        //         .catch()
        // }

        return (
            <div className="char__list">
                {errorMessage}
                {spinner}
                {items}
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