import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Address} from "cluster";

let a: number = 100

let name: string = 'it-kamasutra'

//через | можем указать несколько типов
let isSamurai: boolean | null = true
isSamurai = null

//через <> (дженерики(обобщение)) либо через type[] указываем какой тип используется у элементов массива
let names: Array<string> = ["Dimych", "Viktor", "Valera"]
let names2: string[] = ["Dimych", "Viktor", "Valera"]

alert(names[0].toUpperCase())
names.forEach(n => {
    alert(n.toUpperCase())
})

//Фиксация типов:
let sex: "male" | "female"
sex = "male"

//Для объекта прописываем такую конструкцию чтобы указать типы: (Вопросительный знак в конце означает что свойство не обязательно, его можно не указывать)
type AddressType = {
    city?: string | null
    country: string | null
}
//Для функции которая ничего не принимает прописываем просто пустые скобки, так же если функция ничего не возвращает указываем void
type UserType = {
    sayHello: (message: string) => void
    name: string
    age: number
    isSamurai: boolean,
    address: AddressType | null
}

let user: UserType = {
    sayHello(message: string) {
        alert('yo')
    },
    name: 'Dimych',
    age: 32,
    isSamurai: true,
    address: null
}

//В TypeScript если пишем тип Object это будет аналогично any
const summ: (a: number, b: Object) => number = (a: any, b: Object) => {
    return a + b
}

summ(10, "20")

//Для обычных функций можно оставлять неявную типизацию, но если функция является методом какого либо объекта, то дял нее обязательно нужно описывать типы. В примере выше избыточная типизация


//Чтобы не прописывать постоянно для каждого объекта объект с описанием типов, мы можем использовать лайфхак:
let initialState = {
    name: null as string | null,
    age: null as number | null,
    isSamurai: true as boolean | null,
    address: {
        city: null,
        country: null
    } as AddressType
}

export type InitialStateType = typeof initialState

let state: InitialStateType = {
    name: 'Dimych2',
    age: 23,
    isSamurai: false,
    address: {
        country: 'fsdfsdf',
        city: 'rffzdsfds'
    }
}

let GET_TASKS = "APP/GetTASKS"
type GetTasksActionType = {
    id: number,
    type: typeof GET_TASKS
}
let action: GetTasksActionType = {
    type: GET_TASKS,
    id: 12
}


function App() {
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
                <p>
                    Edit <code>src/App.tsx</code> and save to reload.
                </p>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
                </a>
            </header>
        </div>
    );
}

export default App;
