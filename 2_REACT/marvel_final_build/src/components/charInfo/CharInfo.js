import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';

import useMarvelService from '../../services/MarvelService';
import setContent from '../../utils/setContent';

import './charInfo.scss';


const CharInfo = (props) => {

    //Изначально loading у нас в false так как когда мы первый раз загрузили страницу мы еще не выбирали элемент и вместо этого у нас там где описание персонажа будет стоять skeleton Так же и char у нас должен быть сперва null
    const [char, setChar] = useState(null)

    const {getCharacter, clearError, process, setProcess} = useMarvelService();

    // //В этом хуке мы сравниваем если у нас идет переключение id в стейте (то есть новый id из пропсов не равен предыдущему id из пропсов) тогда мы запускаем обновление и рендер из метода updateChar
    useEffect(() => {
        updateChar()
    }, [props.charId])

    
    //Создаем метод обновления персонажа в котром вытаскиваем из пропсов charId который пришел к нам из App. И если id не приходит то есть состояние selectedChar в App = null тогда нам ничего не возвращается
    const updateChar = () => {
        const {charId} = props
        if (!charId) {
            return;
        }
        clearError()
        getCharacter(charId)
            .then(onCharLoaded)
            .then(() => setProcess('confirmed'))
    }

    const onCharLoaded = (char) => {
        setChar(char)
    }

    // const skeleton =  char || loading || error ? null : <Skeleton/>
    // const errorMessage = error ? <ErrorMessage/> : null;
    // const spinner = loading ? <Spinner/> : null;
    // const content = !(loading || error || !char) ? <View char={char}/> : null

    return (
        <div className="char__info">

            {setContent(process, View, char)}

            {/* {skeleton}
            {errorMessage}
            {spinner}
            {content} */}
        </div>
    )
}

// Сперва мы вытаскиваем данные из объекта char который нам пришел по тому id который был получен когда мы нажали на элемент
const View = ({data}) => {
const {id, name, description, thumbnail, homepage, wiki, comics} = data;

let imgStyle = {'objectFit' : 'cover'};
if (data.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
    imgStyle = {'objectFit' : 'unset'};
}

//В ul мы сперва рендерим объект в котором сперва проверяем если кол-во подгружаемых комиксов = 0 тогда он равняется null и не отрендеривается и переходит к рендеру следующего объекта в котором перебираем массив и строим список комиксов
return (
    <>
    <div className="char__basics">
        <img src={thumbnail} alt={name} style={imgStyle}/>
            <div>
                <div className="char__info-name">{name}</div>
                <div className="char__btns">
                <Link to={`/${id}`} className="button button__main">    
                    {/* <a href={homepage} className="button button__main"> */}
                        <div className="inner">homepage</div>
                    {/* </a> */}
                </Link>
                    <a href={wiki} className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </div>
        <div className="char__descr">
            {description}
        </div>
        <div className="char__comics">Comics:</div>
        <ul className="char__comics-list">
            {comics.length > 0 ? null : 'There is no comics for this character...'}
            {
                comics.map((item, i) => {
                    return (                            
                            <li key={i} className="char__comics-item">
                                <Link to={item.resourceURI.slice(35)}>
                                    {item.name}
                                </Link>
                            </li>                        
                    )
                })
            }
        </ul>
    </>
    )
}

CharInfo.propTypes = {
    charId: propTypes.number
}


export default CharInfo;