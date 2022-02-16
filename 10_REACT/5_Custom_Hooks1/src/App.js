import {useState, useEffect} from 'react';

import './App.css';

function useCounter() {
  const [counter1, setCounter] = useState()

  useEffect(() => {
    fetch('https://www.random.org/integers/?num=1&min=-50&max=50&col=1&base=10&format=plain&rnd=new')
      .then(res => res.json())
      .then(result => setCounter(result))
  }, [])

  const incCounter = () => {
    if (counter1 < 50) {
      setCounter(counter1 => counter1 + 1)
    }
  } 

  const decCounter = () => {
    if (counter1 > -50) {
      setCounter(counter1 => counter1 - 1)
    }
  }

  const rndCounter = () => {
    setCounter(+(Math.random() * (50 - -50) + -50).toFixed(0))
  }

  const resetCounter = () => {
    setCounter(0)
  }

  return {
    counter1,
    incCounter,
    decCounter,
    rndCounter,
    resetCounter
  }

}

const Counter = () => {

  const {counter1, incCounter, decCounter, rndCounter, resetCounter} = useCounter();

  return (
    <div className="component">
      <div className="counter">{counter1}</div>
      <div className="controls">
        <button onClick={incCounter}>INC</button>
        <button onClick={decCounter}>DEC</button>
        <button onClick={rndCounter}>RND</button>
        <button onClick={resetCounter}>RESET</button>
      </div>
    </div>
  )

}

const RndCounter = () => {
  const {counter1, rndCounter, resetCounter} = useCounter();

  return (
    <div className="component">
      <div className="counter">{counter1}</div>
      <div className="controls">
        <button onClick={rndCounter}>RND</button>
        <button onClick={resetCounter}>RESET</button>
      </div>
    </div>
  )

}


const App = () => {

  return (
      <>
          <Counter/>
          <RndCounter/>
      </>
  )
}

export default App;