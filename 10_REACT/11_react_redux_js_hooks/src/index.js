import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, bindActionCreators } from 'redux';
import reducer from './reducer';

//Импортируем Provider которым оборачиваем наш основной компонент App чтобы можно было передать весь наш созданный функционал redux компонентам ниже по иерархии, то есть связываем со всем UI
import { Provider } from 'react-redux';

import App from './components/App';

//Создаем Store
const store = createStore(reducer)

  ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
          <App/>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
  );

//Импортируем все из файла actions.js и помещаем в объект actions:
// import * as actions from './actions';

// //Вытаскиваем dispatch из store для оптимизации кода
// const {dispatch, subscribe, getState} = store


// //Объяснение как работает bindActionCreators:
// // const bindActionCreator = (creator, dispatch) => (...args) => {
// //   dispatch(creator(...args))
// // }

// //В качестве creator берем action creatorы из actions.js Создаем объект в котором прописываем ключи, значениями которых будут action creatorы. и этим объектом будет объект actions который мы импортировали из actions.js
// const {inc, dec, rnd} = bindActionCreators( actions, dispatch)

// // const incDispatch = () => dispatch(inc())
// // const decDispatch = () => dispatch(dec())
// // const rndDispatch = (value) => dispatch(rnd(value))

//Весь следующий функционал уже работает автоматически в Provider, поэтому он нам больше не нужен:


// //Вызываем функцию update чтобы у нас изначално отрендерился интерфейс
// update()

// //Подписка на изменение стейта, функция будет выполнена каждый раз когда изменяется стейт через dispatch
// subscribe(update)


