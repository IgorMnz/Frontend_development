import {createReducer} from "@reduxjs/toolkit";

import {
    heroesFetching,
    heroesFetched,
    heroesFetchingError,
    heroCreated,
    heroDeleted
} from '../actions';

const initialState = {
    heroes: [],
    heroesLoadingStatus: 'idle'
}

// Переписываем reducer через ф-ю createReducer, в нее так же включена библиотека immer, которая позволяет нам напрямую писать изменение стейта, а библиотека внутри проделывает операции, чтобы иммутабельность сохранялась (не нужно самим разворачивать внутренности объекта стейт)
// const heroes = createReducer(initialState, builder => {
//     builder
//         .addCase(heroesFetching, state => {
//             state.heroesLoadingStatus = 'loading';
//         })
//         .addCase(heroesFetched, (state, action) => {
//             state.heroesLoadingStatus = 'idle';
//             state.heroes = action.payload;
//         })
//         .addCase(heroesFetchingError, state => {
//             state.heroesLoadingStatus = 'error';
//         })
//         .addCase(heroCreated, (state, action) => {
//             state.heroes.push(action.payload);
//         })
//         .addCase(heroDeleted, (state, action) => {
//             state.heroes = state.heroes.filter(item => item.id !== action.payload)
//         })
//         .addDefaultCase(() => {});
// })


// Второй вариант записи через createReducer. В нем пишем наши case через объект и динамически создаем ключи объекта, используя ES6 ([]:)
const heroes = createReducer(initialState, {
        [heroesFetching]: state => {
            state.heroesLoadingStatus = 'loading';
        },
        [heroesFetched]: (state, action) => {
            state.heroesLoadingStatus = 'idle';
            state.heroes = action.payload;
        },
        [heroesFetchingError]: state => {
            state.heroesLoadingStatus = 'error';
        },
        [heroCreated]: (state, action) => {
            state.heroes.push(action.payload);
        },
        [heroDeleted]: (state, action) => {
            state.heroes = state.heroes.filter(item => item.id !== action.payload);
        }
    },
    [],
    state => state
)

export default heroes;