import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import Footer from './components/Footer'
import NoteForm from './components/NoteForm'
import Notes from './components/Notes'
import VisibilityFilter from './components/VisibilityFilter'
import noteService from './services/notes'
import { initializeNotes } from './reducers/noteReducer'

const App = (props) => {
  useEffect(() => {
    noteService
      .getAll().then(notes => props.initializeNotes(notes))
  }, [])
  return (
    <div>
      <NoteForm />
      <VisibilityFilter />
      <Notes />
      <Footer />
    </div>
  )
}

export default connect(null, { initializeNotes })(App)