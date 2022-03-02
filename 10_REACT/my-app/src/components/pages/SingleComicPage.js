import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';

import useMarvelService from '../../services/MarvelService';
import AppBanner from '../appBanner/AppBanner';
import setContent from '../../utils/setContent';

import './singleComicPage.scss';

const SingleComicPage = () => {

    //Этот хук нам вернет: {comicId: "99540"} где comicId мы указали сами в App.js поэтмоу вытаскиваем из этого объекта comicId
    const {comicId} = useParams()
    const [comic, setComic] = useState(null)

    const {getComic, clearError, process, setProcess} = useMarvelService();

    // //В этом хуке мы сравниваем если у нас идет переключение id в стейте (то есть новый id из пропсов не равен предыдущему id из пропсов) тогда мы запускаем обновление и рендер из метода updateChar
    useEffect(() => {
        updateComic()
    }, [comicId])

    
    //Создаем метод обновления персонажа в котром вытаскиваем из пропсов charId который пришел к нам из App. И если id не приходит то есть состояние selectedChar в App = null тогда нам ничего не возвращается
    const updateComic = () => {
        clearError()
        getComic(comicId)
            .then(onComicLoaded)
            .then(() => setProcess('confirmed'))
    }

    const onComicLoaded = (comic) => {
        setComic(comic)
    }

    // const errorMessage = error ? <ErrorMessage/> : null;
    // const spinner = loading ? <Spinner/> : null;
    // const content = !(loading || error || !comic) ? <View comic={comic}/> : null

    return (
        <>
            <AppBanner/>
            {setContent(process, View, comic)}
        </>
    )
}

const View = ({data}) => {
    const {title, description, pageCount, thumbnail, language, price} = data;

    return (
        <div className="single-comic">
            <Helmet>
                <meta
                    name="description"
                    content={`${title} comics book`}
                    />
                <title>{title}</title>
            </Helmet>
            <img src={thumbnail} alt={title} className="single-comic__img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{title}</h2>
                <p className="single-comic__descr">{description}</p>
                <p className="single-comic__descr">{pageCount}</p>
                <p className="single-comic__descr">Language: {language}</p>
                <div className="single-comic__price">{price}</div>
            </div>
            <Link to="/comics" className="single-comic__back">Back to all</Link>
        </div>
    )
}

export default SingleComicPage;