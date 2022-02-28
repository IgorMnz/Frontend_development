import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import AppBanner from '../appBanner/AppBanner';

import './singleCharPage.scss';

const SingleCharPage = () => {

    //Этот хук нам вернет: {comicId: "99540"} где comicId мы указали сами в App.js поэтмоу вытаскиваем из этого объекта comicId
    const {charId} = useParams()
    const [char, setChar] = useState(null)

    const {loading, error, getCharacter, clearError} = useMarvelService();

    // //В этом хуке мы сравниваем если у нас идет переключение id в стейте (то есть новый id из пропсов не равен предыдущему id из пропсов) тогда мы запускаем обновление и рендер из метода updateChar
    useEffect(() => {
        updateChar()
    }, [charId])

    
    //Создаем метод обновления персонажа в котром вытаскиваем из пропсов charId который пришел к нам из App. И если id не приходит то есть состояние selectedChar в App = null тогда нам ничего не возвращается
    const updateChar = () => {
        clearError()
        getCharacter(charId)
            .then(onCharLoaded)
    }


    const onCharLoaded = (char) => {
        setChar(char)
    }

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error || !char) ? <View char={char}/> : null

    return (
        <>
            <AppBanner/>
            {errorMessage}
            {spinner}
            {content}
        </>
    )
}

const View = ({char}) => {
    const {name, description, thumbnail, comics} = char;

    let imgStyle = {'objectFit' : 'cover'};
    if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
        imgStyle = {'objectFit' : 'unset'};
    }

    return (
        <div className="single-char">
            <img src={thumbnail} alt={name} className="single-char__img" style={imgStyle}/>
            <div className="single-char__info">
                <h2 className="single-char__name">{name}</h2>
                <p className="single-char__descr">{description}</p>
                <p className="single-char__descr">Comics:</p>
                <ul className="char__comics-list">
            {comics.length > 0 ? null : 'There is no comics for this character...'}
            {
                comics.map((item, i) => {
                    return (                            
                            <li key={i} className="single-char__comics-item">
                                <Link to={item.resourceURI.slice(35)}>
                                    {item.name}
                                </Link>
                            </li>                        
                    )
                })
            }
        </ul>
            </div>
            <Link to="/" className="single-char__back">Back to homepage</Link>
        </div>
    )
}

export default SingleCharPage;