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
    const content = !(loading || error || !char) ? <View comic={char}/> : null

    return (
        <>
            <AppBanner/>
            {errorMessage}
            {spinner}
            {content}
        </>
    )
}

const View = (char) => {
    const {name, description, thumbnail} = char;

    return (
        <div className="single-comic">
            <img src={thumbnail} alt={name} className="single-comic__img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{name}</h2>
                <p className="single-comic__descr">{description}</p>
            </div>
            <Link to="/" className="single-comic__back">Back to homepage</Link>
        </div>
    )
}

export default SingleCharPage;