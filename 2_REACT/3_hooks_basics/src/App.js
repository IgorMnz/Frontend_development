import {useState} from 'react';
import './App.css';
import Form from './Form';
import dataContext from './context';

const {Provider} = dataContext;

//Если меняется стейт в App например при помощь кнопки button то все внутри компоненты или элементы начинают перерендерится
function App() {
    const [data, setData] = useState({
        mail: "name@example.com",
        text: 'some text',
        forceChangeMail: forceChangeMail
    });

    function forceChangeMail() {
        setData({...data, mail: 'test@gmail.com'})
    }

    return (
        <Provider value={data}>
            <Form text={data.text}/>
            <button 
                onClick={() => setData({
                    mail: "second@example.com",
                    text: 'another text',
                    forceChangeMail: forceChangeMail
                })}>
                Click me
            </button>
        </Provider>
    );
}

export default App;
