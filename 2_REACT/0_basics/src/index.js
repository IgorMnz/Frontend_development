import React, {StrictMode} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';

// const elem = <h2 class='greetings'>Hello world!</h2> //Это называется React элемент

// const text = 'Hello World!'

// const elem = (
//   <div>
//       <h2 className='greetings'>Текст: {text}</h2>
//       <input type="text" />
//       <button tabIndex="0">Click</button>
//   </div>

// ); //Если элемент имеет многострочную структуру, мы ее оборачиваем в скобки а так же он обязательно должен иметь один корневой элемент(у нас div)

// const elem = React.createElement('h2', {className: 'greetings'}, 'Hello world!');

ReactDOM.render(
  // elem,
  <StrictMode>
    <App/>
  </StrictMode>,
  document.getElementById('root')
);

 