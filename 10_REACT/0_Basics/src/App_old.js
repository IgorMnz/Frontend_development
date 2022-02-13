import React, {Component, StrictMode} from 'react'; //Содержит родительский класс React component для того чтобы создавать классовые компоненты
import styled from 'styled-components';
import BootstrapTest from './BootstrapTest';

import './App.css';

const EmpItem = styled.div`
	padding: 20px;
	margin-bottom: 15px;
	border-radius: 5px;
	box-shadow: 5px 5px 10px rgba(0,0,0, .2)
`

const Header = styled.h2`
	font-size: 22px;
`


// //Создаем функциональный компонент:
// const Header = () => {
//   return <h2>Hello world!</h2>
// }

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
			<EmpItem>
				<button onClick={this.nextYear}>{this.state.text}</button>
				<Header>My name is {name}, 
					surname - {surname}, 
					age - {years}, 
					position - {position}
				</Header>
				<a href={link}>My profile</a>
				<form>
					<span>Введите должность</span>
					<input type="text" onChange={(e) => this.commitInputChanges(e, 'some color')}/>
				</form>
			</EmpItem>
		)
	}
}

const Wrapper = styled.div`
	width: 600px;
	margin: 80px auto 0 auto;
`

const DynamicGreating = (props) => {
	return (
		<div className={'mb-3 p-3 border border-' + props.color}>
			{
				React.Children.map(props.children, child => {
					return React.cloneElement(child, {className: 'shadow p-3 m-3 border rounded'})
				})
			}
		</div>
	)
}

const HelloGreeting = () => {
	return (
		<div style ={{'width': '600px', 'margin': '0 auto'}}>
			<DynamicGreating color={'primary'}>
				<h2>Hello World!</h2>
			</DynamicGreating>
		</div>
	)
}

const Message = (props) => {
	return (
		<h2>The counter is {props.counter}</h2>
	)
}

class Counter extends Component {
	state = {
		counter: 0
	}

	changeCounter = () => {
		this.setState(({counter}) => ({
			counter: counter + 1
		}))
	}

	render() {
		return (
			<>
				<button
					className={'btn btn-primary'}
					onClick={this.changeCounter}>
						Click me
				</button>
				{this.props.render(this.state.counter)}
			</>
		)
	}
}

//Основной функциональный Компонент App:
function App() {
  return (
	  <Wrapper>

		  <Counter render={counter => (
			  <Message counter={counter}/>
		  )}/>

		  <HelloGreeting/>
		  <BootstrapTest
		  	left = {
				<DynamicGreating color={'primary'}>
					<h2>LEFT_1!</h2>
					<h2>LEFT_2!</h2>
			  	</DynamicGreating>
			  }
			right = {
				<DynamicGreating color={'primary'}>
					<h2>RIGHT_1!</h2>
					<h2>RIGHT_2!</h2>
			  	</DynamicGreating>
			}
		  />

		<WhoAmI name='John' surname="Smith" link="facebook.com"/>
		<WhoAmI name='Alex' surname="Shepard" link="vk.com"/>
	  </Wrapper>
  );
}

export {Header};
export default App;
