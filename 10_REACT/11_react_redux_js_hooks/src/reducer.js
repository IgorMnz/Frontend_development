const initialState = {value: 0}

//Первый аргумент state - предыдущее значение стейта, action - то что приходит извне store из view. Тут же задаем изначальное состояние state
//reducer должна быть чистой функцией и соблюдать принцип иммутабельности
//Так как изначальный стейт это объект, чтобы соблюсти принцип иммутабельности необходимо создать копию объекта через spread оператор(...) и потом прописать какое свойство этого объекта и как оно меняется
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