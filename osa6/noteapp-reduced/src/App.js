import React from 'react'
import Footer from './components/Footer'
import NoteForm from './components/NoteForm'
import Notes from './components/Notes'
import VisibilityFilter from './components/VisibilityFilter'

const App = () => (
  <div>
    <NoteForm />
    <VisibilityFilter />
    <Notes />
    <Footer />
  </div>
)

export default App