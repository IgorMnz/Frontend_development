import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';
import { Component } from 'react/cjs/react.production.min';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import MarvelService from '../../services/MarvelService'

class RandomChar extends Component {

    state = {
        char: {},
        loading: true,
        error: false
        // name: null,
        // description: null,
        // thumbnail: null,
        // homepage: null,
        // wiki: null
    }

    marvelService = new MarvelService();

    componentDidMount() {
        this.updateChar();
        // this.timerId = setInterval(this.updateChar, 3000);
    }

    componentWillUnmount() {
        // clearInterval(this.timerId);
    }

    onCharLoading = () => {
        this.setState({
            loading: true
        })
    }

    onCharLoaded = (char) => {
        this.setState({
            char,
            loading: false
        })

    // if (this.state.char.description === '') {
    //     this.setState({char:{
    //         name: char.name,
    //         description: "Description not found... sorry",
    //         thumbnail: char.thumbnail,
    //         homepage: char.homepage,
    //         wiki: char.homepage}})
    // }

    // if (this.state.char.description.length > 137) {
    //     this.setState({char:{
    //         name: char.name,
    //         description: `${char.description.substring(0, 138)}...`,
    //         thumbnail: char.thumbnail,
    //         homepage: char.homepage,
    //         wiki: char.homepage}})
    // }
    }

    onError = () => {
        this.setState({
            loading: false,
            error: true
        })
    }

    //Перед запросом у нас состояние loading  переходит в true в методе this.onCharLoading() а потом когда произошла загрузка, в методе this.onCharLoaded состояние переключается в false
    updateChar = () => {
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000)
        this.onCharLoading()
        this.marvelService
            .getCharacter(id)
            .then(this.onCharLoaded)
            .catch(this.onError)
    }

    render() {

        const {char, loading, error} = this.state;

        //В это переменной будет содержаться либо ничего, либо элемент с ошибкой
        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        //Заносим в переменную то, что будет у нас отображаться в зависимости от того в каком состоянии у нас наш контент. Если у нас нету загрузки и нету ошибки то мы возвращаем наш компонент с содежимым
        const content = !(loading || error) ? <View char={char}/> : null



        //В методе рендер сперва отрисовывается то где первее стоит return. То есть если у нас загрузка true то будет отрисовываться спиннер (условный рендеринг) Если приходит null то у нас ничего рендериться не будет
        // if (loading) {
        //     return <Spinner/>
        // }
        

        return (
            <div className="randomchar">
                {errorMessage}
                {spinner}
                {content}
                <div className="randomchar__static">
                    <p className="randomchar__title">
                        Random character for today!<br/>
                        Do you want to get to know him better?
                    </p>
                    <p className="randomchar__title">
                        Or choose another one
                    </p>
                    <button onClick={this.updateChar} className="button button__main">
                        <div className="inner">try it</div>
                    </button>
                    <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
                </div>
            </div>
        )
    }
}

const View = ({char}) => {

    const {name, description, thumbnail, homepage, wiki} = char;

    //Проверяем если с сервера приходит изображение заглушка то мы изменяем класс у картинки
    const notImg = thumbnail === "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg";
    const imgClass = notImg ? "randomchar__img__notfound" : "randomchar__img";

    return (
        <div className="randomchar__block">
            <img src={thumbnail} alt="Random character" className={imgClass}/>
            <div className="randomchar__info">
                <p className="randomchar__name">{name}</p>
                <p className="randomchar__descr">
                    {description}
                </p>
                <div className="randomchar__btns">
                    <a href={homepage} className="button button__main">
                        <div className="inner">homepage</div>
                    </a>
                    <a href={wiki} className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default RandomChar