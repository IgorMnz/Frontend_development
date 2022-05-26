import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    filters: [],
    filtersLoadingStatus: 'idle',
    activeFilter: 'all'
}

const filtersSlice = createSlice({
    name: 'filters', //инициируем название (пространство имен action creators), как будет называться наш срез
    initialState,
    reducers: {
        filtersFetching: state => {
            state.filtersLoadingStatus = 'loading';
        },
        filtersFetched: (state, action) => {
            state.filtersLoadingStatus = 'idle';
            state.filters = action.payload;
        },
        filtersFetchingError: state => {
            state.filtersLoadingStatus = 'error';
        },
        activeFilterChanged: (state, action) => {
            state.activeFilter = action.payload;
        }
    }
});

const {actions, reducer} = filtersSlice;

export default reducer;
export const {
    filtersFetching,
    filtersFetched,
    filtersFetchingError,
    activeFilterChanged,
} = actions;