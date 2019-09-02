import React from 'react'
import './App.css'

const App = (props) => {
  const store = props.store

  return (
    <div>
      <div className='result'>
        {store.getState()}
      </div>
      <div className='buttons'>
        <button onClick={() => store.dispatch({ type: 'INCREMENT' })}>plus</button>
        <button onClick={() => store.dispatch({ type: 'DECREMENT' })}>minus</button>
        <button onClick={() => store.dispatch({ type: 'ZERO' })}>zero</button>
      </div>
    </div>
  )
}

export default App
