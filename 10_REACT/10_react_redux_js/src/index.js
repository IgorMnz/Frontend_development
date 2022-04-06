import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';

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

//Создаем Store
const store = createStore(reducer)

const update = () => {
  document.getElementById('counter').textContent = store.getState().value
}

//Подписка на изменение стейта, функция будет выполнена каждый раз когда изменяется стейт через dispatch
store.subscribe(update)

//Создаем функцию action creator для удобства, которая просто возвращает тип action который мы хотим передать в dispatch
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


// let state = reducer(initialState, {type: 'INC'})
// state = reducer(state, {type: 'INC'})
// state = reducer(state, {type: 'INC'})
// state = reducer(state, {type: 'INC'})
// console.log(state)

ReactDOM.render(
  <React.StrictMode>
    <>
    
    </>
  </React.StrictMode>,
  document.getElementById('root')
);