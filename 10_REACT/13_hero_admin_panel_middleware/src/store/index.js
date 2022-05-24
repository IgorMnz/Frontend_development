// import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
// import ReduxThunk from 'redux-thunk';

import { configureStore } from '@reduxjs/toolkit';
import heroes from '../reducers/heroes';
import filters from '../reducers/filters';

const stringMiddleware = () => (next) => (action) => {
    if (typeof action === 'string') {
        return next({
            type: action
        })
    }
    return next(action)
}

// const enhancer = (createStore) => (...args) => {
//     const store = createStore(...args);

//     const oldDispatch = store.dispatch;
//     store.dispatch = (action) => {
//         if (typeof action === 'string') {
//             return oldDispatch({
//                 type: action
//             })
//         }
//         return oldDispatch(action)
//     }
//     return store;
// }

//С помощью combineReducers совмещаем оба наших reducera, прописывая их в объекте как {heroes: heroes, filters: filters} и прописываем сокращенный вариант:
//Для объединения функций в одну композицию, которую мы потом можем передать второй функцией createStore при создании стора используем функцию compose
// const store = createStore(  
//                         combineReducers({heroes, filters}), 
//                         compose(
//                             applyMiddleware(ReduxThunk, stringMiddleware),
//                             window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
//                         ));

// Создание стора через функцию configureStore:
const store = configureStore({
    reducer: {heroes, filters},
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(stringMiddleware),
    devTools: process.env.NODE_ENV !== 'production',
})

export default store;

