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


// //Разбираем props функционального компонента:
// function WhoAmI ({name, surname, link}) {
// 	return (
// 		<div>
// 			<h1>My name is {name()}, surname - {surname}</h1>
// 			<a href={link}>My profile</a>
// 		</div>
// 	)
// }

//Переделываем WhoAmI в классовый компонент (чтобы передать props используем конструктор). Чтобы сделать событие передаем название метода который прописываем здесь же в классе(только через стрелочную функцию):
class WhoAmI extends Component {
	constructor(props) {
		super(props);
		this.state = {
			years: 27,
			text: '+++',
			position: ''
		}
	}

	nextYear = () => {
		this.setState(state => ({
			years: state.years + 1
		}))
	}

	commitInputChanges = (e, color) => {
		console.log(color)
		this.setState({
			position: e.target.value
		})
	}

	render() {
		const {name, surname, link} = this.props;
		const {position, years} = this.state;
		return (
			<div>
				<button onClick={this.nextYear}>{this.state.text}</button>
				<h1>My name is {name}, 
					surname - {surname}, 
					age - {years}, 
					position - {position}
				</h1>
				<a href={link}>My profile</a>
				<form>
					<span>Введите должность</span>
					<input type="text" onChange={(e) => this.commitInputChanges(e, 'some color')}/>
				</form>
			</div>
		)
	}
}

//Основной функциональный Компонент App:
function App() {
  return (
    <div className="App">
	  <StrictMode>
			<Header/>
	  </StrictMode>
      <Field/>
      <Btn/>
	  <WhoAmI name='John' surname="Smith" link="facebook.com"/>
	  <WhoAmI name='Alex' surname="Shepard" link="vk.com"/>
    </div>
  );
}

export {Header};
export default App;
