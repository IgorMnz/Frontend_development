import {useState, useEffect} from 'react';
import './App.css';


const App = (props) => {
  
    const [counter, setCounter] = useState(props.counter);
    const [items, setItems] = useState();
    const [input, setInput] = useState('');

    useEffect(() => {
        fetch("http://data.fixer.io/api/latest?access_key=cfd34abc9efead0be284a9b753d35dfc&symbols=USD,AUD,CAD,PLN,MXN&format=1")
          .then(res => res.json())
          .then(result => setItems(result.rates))
      }, [])

    function toUSD () {
        setCounter(Math.round(items.USD * input))
    }
    
    function toPLN () {
        setCounter(Math.round(items.PLN * input))
    }

    function toMXN () {
        setCounter(Math.round(items.MXN * input))
    }
    
    // function rndNum () {
    //    let min = -50;
    //    let max = 50;
    //    let rand = +(min + (Math.random() * (max-min))).toFixed(0);
    //    setCounter (rand)
    // }
    
    function reset () {
      setCounter(props.counter)
    }
        
    return (
        <div className="app">
          <input type="number" className="input" placeholder="Введите EUR" value={input} onInput={e => setInput(e.target.value)}/>

            <div className='descr'>Пересчет EUR на:</div>
          <div className="controls">
            <button onClick={toUSD}>USD</button>
            <button onClick={toPLN}>PLN</button>
            <button onClick={toMXN}>MXN</button>
            <button onClick={reset}>RESET</button>
          </div>
          <div className="counter">{counter}</div>
        </div>
  )
  }

export default App;


{/* <button onClick={incNum}>USD</button>
<button onClick={decNum}>EUR</button>
<button onClick={rndNum}>GBP</button>
<button onClick={reset}>RESET</button>

<div className="counter">{counter}</div>

*/}