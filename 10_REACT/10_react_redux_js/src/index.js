import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';

const initialState = 0;

//Эта функция похожа на useState - вначале принимает в себя состояние state, а затем принимает в себя action действие для изменения этого стейта
const reducer = (state = 0, action) => {
    switch (action.type) {
        case "INC":
            return state + 1;
        default:
            return state;
    }
}

const store = createStore(reducer)

store.dispatch({type: 'INC'})
store.dispatch({type: 'INC'})

store.subscribe(() => {
    console.log(store.getState())
})

// //инициируем создание нашего глобального стейта, первый запуск который мы будем осуществлять
// let state = reducer(initialState, {type: 'INC'})
//     state = reducer(state, {type: 'INC'})
//     state = reducer(state, {type: 'INC'})
//     state = reducer(state, {type: 'INC'})
// console.log(state)

ReactDOM.render(
  <React.StrictMode>
    <>
    
    </>
  </React.StrictMode>,
  document.getElementById('root')
);