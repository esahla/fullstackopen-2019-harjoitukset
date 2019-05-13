import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const History = (props) => {
  if (props.allClicks.length === 0) {
    return (
      <div>
        sovellusta käytetään nappeja painelemalla
      </div>
    )
  }

  return (
    <div>
      näppäilyhistoria: {props.allClicks.join(' ')}
    </div>
  )
}

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const App = (props) => {
  const [left, setLeft] = useState(0)
  const [right, setRight] = useState(0)
  const [allClicks, setAll] = useState([])

  const handleLeftClick = () => {
    setAll(allClicks.concat('L'))
    setLeft(left + 1)
  }

  const handleRightClick = () => {
    setAll(allClicks.concat('R'))
    setRight(right + 1)
  }

  return (
    <div>
      <div>
        {left}
        <Button handleClick={handleLeftClick} text='vasen' />
        <Button handleClick={handleRightClick} text='oikea' />
        {right}
        <History allClicks={allClicks} />
      </div>
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)

/*
const Display = ({ counter }) => <div>{counter}</div>
const Button = ({ handleClick, text }) => <button onClick={handleClick}>{text}</button>

const App = () => {
  const [counter, setCounter] = useState(0)
  const setToValue = (value) => setCounter(value)

  return (
    <>
      <Display counter={counter} />
      <Button
        handleClick={() => setToValue(counter + 1)}
        text='Plus'
      />
      <Button
        handleClick={() => setToValue(counter - 1)}
        text='Minus'
      />
      <Button
        handleClick={() => setToValue(0)}
        text='Zero'
      />
    </>
  )
}


ReactDOM.render(
  <App />,
  document.getElementById('root')
)
*/

/* import React from 'react'
import ReactDOM from 'react-dom'
import './index.css';

const Hello = ({firstName, lastName, age}) => {
    const bornYear = () => {
        const yearNow = new Date().getFullYear()
        return yearNow - age
    }

    return (
      <div>
        <p>Hello to {firstName} {lastName}, you are {age} years old.</p>
        <p>You were born {bornYear()}</p>
      </div>
    )
}

const Footer = () => {
    return (
      <div>
        greeting app created by
        <a href="https://github.com/esahla/">esahla.</a>
      </div>
    )
}

const App = () => {
    const now = new Date()
    const nimi = 'Pekka'
    const ika = 10

    return (
      <>
        <h2>Greetings!</h2s>
        <p>Hello world, it's {now.toJSON()}</p>
        <br/>
        <Hello firstName={nimi} lastName="Kekkonen" age={ika}/>
        <Hello firstName="Kerkko" lastName="Lollero" age={ika}/>
        <Hello firstName={nimi} lastName="Kekkonen" age="99"/>
        <Footer />
      </>
    )
}

ReactDOM.render(<App />, document.getElementById('root')) */