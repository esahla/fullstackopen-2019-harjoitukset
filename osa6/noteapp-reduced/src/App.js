import React from 'react'
import Footer from './components/Footer'
import NoteForm from './components/NoteForm'
import Notes from './components/Notes'

const App = (props) => {
  const store = props.store

  return (
    <div>
      <NoteForm store={store}/>
      <Notes store={store}/>
      <Footer />
    </div>
  )
}

export default App