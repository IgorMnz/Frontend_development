const initialState = {
    heroes: [],
    heroesLoadingStatus: 'idle',
    filters: []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'HEROES_FETCHING':
            return {
                ...state,
                heroesLoadingStatus: 'loading'
            }
        case 'HEROES_FETCHED':
            return {
                ...state,
                heroes: action.payload,
                heroesLoadingStatus: 'idle'
            }
        case 'HEROES_FETCHING_ERROR':
            return {
                ...state,
                heroesLoadingStatus: 'error'
            }
        case 'HERO_DELETED': 
        // //Мы с помощью метода filter создаем новый массив у которого не будет того элемента который был получен путем нажатия на кнопку удаления. То есть данные отфильтруются и останутся только те элементы, id которых не совподают с тем id который к нам пришел как аргумент (останутся только те, которые по условию в скобках будут true)
        const newHeroList = state.heroes.filter(item => item.id !== action.payload);
        return {
            ...state,
            heroes: newHeroList
        }
        default: return state
    }
}

export default reducer;