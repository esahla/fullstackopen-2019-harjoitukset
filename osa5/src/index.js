import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './index.css'

ReactDOM.render(<App />, document.getElementById('root'))

/* import React, { useState } from 'react'
import ReactDOM from 'react-dom'

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
} */

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