import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    heroes: [],
    heroesLoadingStatus: 'idle'
}

const heroesSlice = createSlice({
    name: 'heroes', //инициируем название (пространство имен action creators), как будет называться наш срез
    initialState,
    reducers: {
        heroesFetching: state => {
                    state.heroesLoadingStatus = 'loading'
                },
        heroesFetched: (state, action) => {
                    state.heroes = action.payload;
                    state.heroesLoadingStatus = 'idle';
                },
        heroesFetchingError: state => {
                    state.heroesLoadingStatus = 'error';
                }, 
        heroCreated: (state, action) => {
                    state.heroes.push(action.payload);
                },    
        heroDeleted: (state, action) => {
                    state.heroes = state.heroes.filter(item => item.id !== action.payload);
                }
    }
});

const {actions, reducer} = heroesSlice;

export default reducer;
export const {
    heroesFetching, 
    heroesFetched, 
    heroesFetchingError, 
    heroCreated, 
    heroDeleted
} = actions;
