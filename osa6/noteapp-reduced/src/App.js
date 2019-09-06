import React from 'react'
import Footer from './components/Footer'
import NoteForm from './components/NoteForm'
import Notes from './components/Notes'
import VisibilityFilter from './components/VisibilityFilter'

const App = (props) => {
  const store = props.store

  return (
    <div>
      <NoteForm store={store}/>
      <VisibilityFilter store={store}/>
      <Notes store={store}/>
      <Footer />
    </div>
  )
}

export default App