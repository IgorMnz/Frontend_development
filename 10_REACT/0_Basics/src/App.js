import {Component, StrictMode} from 'react'; //Содержит родительский класс React component для того чтобы создавать классовые компоненты
import './App.css';

//Создаем функциональный компонент:
const Header = () => {
  return <h2>Hello world!</h2>
}

//Создаем функциональный компонент Field:
// const Field = () => {
//   const holder = 'Enter here'
//   const styledField = {
//     width: '300px',
//     background: 'lightgrey'
//   }
//   return <input 
// 			placeholder={holder}
// 			type="text"
// 			style={styledField}/>
// } //Чтобы добавить инлайн стили мы создаем объект который помещаем в атрибут style

//Создаем классовый компонент Field:
class Field extends Component {
	render() {
		const holder = 'Enter here'
		const styledField = {
		  width: '300px',
		  background: 'lightgrey'
		};

		return <input 
		placeholder={holder}
		type="text"
		style={styledField}/>
	}
}

//Создаем функциональный компонент:
function Btn() {

  // const res = () => {
  //   return "Log In"
  // }
  // const p = <p>Log In</p> //это элемент внутри компонента

  const text = "Log In"
  const logged = false

  return <button>{logged ? 'Log Out' : text}</button>
} //в вызове можем использовать либо переменную, либо вызвать функцию, либо элемент, либо какое либо выражение


//Основной функциональный Компонент App:
function App() {
  return (
    <div className="App">
	  <StrictMode>
			<Header/>
	  </StrictMode>
      <Field/>
      <Btn/>
    </div>
  );
}

export {Header};
export default App;
