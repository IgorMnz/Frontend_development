import {createSlice, createAsyncThunk, createEntityAdapter} from "@reduxjs/toolkit";
import {useHttp} from '../../hooks/http.hook';
import {createSelector} from '@reduxjs/toolkit';

const heroesAdapter = createEntityAdapter()

// const initialState = {
//     heroes: [],
//     heroesLoadingStatus: 'idle'
// }

// Создаем начальное состояние через createEntityAdapter. heroes: [] будет заключаться в ids: [] который находится в createEntityAdapter
const initialState = heroesAdapter.getInitialState({
    heroesLoadingStatus: 'idle'
})

export const fetchHeroes = createAsyncThunk(
    'heroes/fetchHeroes',
    () => {
        const {request} = useHttp();
        return request("http://localhost:3001/heroes")
    })

const heroesSlice = createSlice({
    name: 'heroes', //инициируем название (пространство имен action creators), как будет называться наш срез
    initialState,
    reducers: {
        heroCreated: (state, action) => {
            // state.heroes.push(action.payload);
            heroesAdapter.addOne(state, action.payload)
        },
        heroDeleted: (state, action) => {
            // state.heroes = state.heroes.filter(item => item.id !== action.payload);
            heroesAdapter.removeOne(state, action.payload)
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchHeroes.pending, state => {
                state.heroesLoadingStatus = 'loading'
            })
            .addCase(fetchHeroes.fulfilled, (state, action) => {
                state.heroesLoadingStatus = 'idle';
                heroesAdapter.setAll(state, action.payload);
            })
            .addCase(fetchHeroes.rejected, state => {
                state.heroesLoadingStatus = 'error';
            })
            .addDefaultCase(() => {
            })
    }
});

const {actions, reducer} = heroesSlice;

export default reducer;

export const {selectAll} = heroesAdapter.getSelectors(state => state.heroes)

//тут получаем в конечном итоге функцию selector (функция которая получает кусочек нашего стейта) с помощью функции createSelector из библиотеки reselect, в ней прописываем кусочки значений из наших разных стейтов и в конце пишем необходимую нам функцию где используем эти значения из стейтов
export const filteredHeroesSelector = createSelector(
    (state) => state.filters.activeFilter,
    selectAll,
    (filter, heroes) => {
        if (filter === 'all') {
            return heroes;
        } else {
            return heroes.filter(item => item.element === filter)
        }
    }
);

export const {
    heroesFetching,
    heroesFetched,
    heroesFetchingError,
    heroCreated,
    heroDeleted
} = actions;
