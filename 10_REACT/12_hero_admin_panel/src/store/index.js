import { createStore, combineReducers } from 'redux';
import heroes from '../reducers/heroes';
import filters from '../reducers/filters';

//С помощью combineReducers совмещаем оба наших reducera, прописывая их в объекте как {heroes: heroes, filters: filters} и прописываем сокращенный вариант:
const store = createStore(  combineReducers({heroes, filters}),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;