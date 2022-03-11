const initialState = {value: 0};

//Эта функция похожа на useState - вначале принимает в себя состояние state, а затем принимает в себя action действие для изменения этого стейта
//С помощью spread оператора создаем новый объект в reducer сохраняя при этом принцип иммутабельности
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "INC":
            return {
              ...state,
              value: state.value + 1
            };
        case "DEC":
          return {
            ...state,
            value: state.value - 1
          };
        case "RND":
          return {
            ...state,
            value: state.value * action.payload
          };
        default:
            return state;
    }
}

export default reducer