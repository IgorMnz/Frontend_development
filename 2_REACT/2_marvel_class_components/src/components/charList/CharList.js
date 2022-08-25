import { Component } from 'react/cjs/react.production.min';
import propTypes from 'prop-types';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import MarvelService from '../../services/MarvelService'

import './charList.scss';

class CharList extends Component {

    state = {
        charList: [],
        loading: true,
        error: false,
        newItemLoading: false,
        offset: 210,
        charEnded: false,
    }

    marvelService = new MarvelService();

    //Когда у нас компонент отрендерился мы запускаем метод запроса на сервер (без аргумента, это значит у нас подставляется дефолтное значение оффсета) и подгружаем перонажей
    componentDidMount() {
        this.onRequest()
    }

    //Создаем метод запроса на сервер и подгружаем персонажей с тем отступом, который мы зададим
    onRequest = (offset) => {
        this.onCharListLoading()
        this.marvelService
            .getAllCharacters(offset)
            .then(this.onCharListLoaded)
            .catch(this.onError)
    }

    //Этот метод переключает наш стейт загрузки новых данных newItemLoading в true 
    onCharListLoading = () => {
        this.setState({
            newItemLoading: true
        })
    }

    //Когда у нас страница загружается первый раз и этот метод запускается впервые, у нас в ...charList пустой массив поэтому он ни во что не развернеться только ...newCharList. В последующем у нас в ...charList будут старые элементы а в ...newCharList новые элементы которые будут складываться в один массив и далее этот метод пойдет в формирование верстки
    onCharListLoaded = (newCharList) => {

        //Проверяем, если у нас возвращается меньше 9 персонажей(последние) тогда присваиваем стейту charEnded значение true посредством переменной ended
        let ended = false;
        if (newCharList.length < 9 ) {
            ended = true;
        }

        //у нас новый стейт charList будет зависеть от предудщего charList и для того чтобы отрендерить новых персонажей мы в массив charList через spread оператор складываем сперва массив предыдущих персонажей и массив новых персонажей. Так же увеличиваем наш оффсет на 9 при каждом новом запросе на сервер
        this.setState(({offset, charList}) => ({
            charList: [...charList, ...newCharList],
            loading: false,
            newItemLoading: false,
            offset: offset + 9,
            charEnded: ended
        }))
    }

    onError = () => {
        this.setState({
            loading: false,
            error: true
        })
    }


    // itemRefs = [];

    // setRef = (ref) => {
    //     this.itemRefs.push(ref);
    // }

    // focusOnItem = (id) => {
    //     // Я реализовал вариант чуть сложнее, и с классом и с фокусом
    //     // Но в теории можно оставить только фокус, и его в стилях использовать вместо класса
    //     // На самом деле, решение с css-классом можно сделать, вынеся персонажа
    //     // в отдельный компонент. Но кода будет больше, появится новое состояние
    //     // и не факт, что мы выиграем по оптимизации за счет бОльшего кол-ва элементов

    //     // По возможности, не злоупотребляйте рефами, только в крайних случаях
    //     this.itemRefs.forEach(item => item.classList.remove('char__item_selected'));
    //     this.itemRefs[id].classList.add('char__item_selected');
    //     this.itemRefs[id].focus();
    // }


    renderCharList (arr) {

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
                    // ref={this.setRef} 
                    onClick={() => {
                        this.props.onCharSelected(item.id);
                        this.focusOnItem(i);}}
                    onKeyPress={(e) => {
                        if (e.key === ' ' || e.key === "Enter") {
                            this.props.onCharSelected(item.id);
                            this.focusOnItem(i);
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
    render() {

        const {charList, loading, error, offset, newItemLoading, charEnded} = this.state;

        const items = this.renderCharList(charList)

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
                    onClick={() => this.onRequest(offset)}>
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

CharList.propTypes = {
    onCharSelected: propTypes.func.isRequired
}

export default CharList;