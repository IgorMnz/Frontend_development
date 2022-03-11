import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';

const initialState = {value: 0};

//Эта функция похожа на useState - вначале принимает в себя состояние state, а затем принимает в себя action действие для изменения этого стейта. По умолчанию state = 0 (если первый аргумент получаем какой нибудь undefined то нам вернется этот изначальный стейт)
//reducer всегда должна быть чистой функцией - зависеть только от state который в нее приходит и от action, причем она должна возвращать один и тот же результат при одинаковых аргументах и не иметь никаких побочных эффектов (никаких случайных чисел, никаких работ с DOM деревом, никаких выводов в консоль и запросов на сервер) так же reducer должна соблюдать принципы иммутабельности
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

//Создаем Store
const store = createStore(reducer)

const update = () => {
  document.getElementById('counter').textContent = store.getState().value
}

//Делаем подписку на наш store и выводим функцию которая будет выполняться при каждом изменении state (store.dispatch)
store.subscribe(update)

//Создадим action creator
const inc = () => ({type: 'INC'})
const dec = () => ({type: 'DEC'})
const rnd = (value) => ({type: 'RND', payload: value})

document.getElementById('inc').addEventListener('click', () => {
  store.dispatch(inc())
})

document.getElementById('dec').addEventListener('click', () => {
  store.dispatch(dec())
})

document.getElementById('rnd').addEventListener('click', () => {
  const value = Math.floor(Math.random() * 10)
  store.dispatch(rnd(value))
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