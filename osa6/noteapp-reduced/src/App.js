import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import Footer from './components/Footer'
import NoteForm from './components/NoteForm'
import Notes from './components/Notes'
import VisibilityFilter from './components/VisibilityFilter'
import { initializeNotes } from './reducers/noteReducer'

const App = (props) => {
  useEffect(() => {
    props.initializeNotes()
  },[])

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