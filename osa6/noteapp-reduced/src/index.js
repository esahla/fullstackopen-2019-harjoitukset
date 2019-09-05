import React from 'react'
import { createStore } from 'redux'
import ReactDOM from 'react-dom'
import App from './App'
import noteReducer from './reducers/noteReducer'
import './index.css'

const store = createStore(noteReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

store.dispatch({
  type: 'NEW_NOTE',
  data: {
    content: 'the app state is in redux store',
    important: true,
    id: 1
  }
})  

store.dispatch({
  type: 'NEW_NOTE',
  data: {
    content: 'state changes are made with actions',
    important: false,
    id: 2
  }
})

const renderApp = () => {
  ReactDOM.render(
    <App store={store}/>,
    document.getElementById('root')
  )
}

renderApp()
store.subscribe(renderApp)