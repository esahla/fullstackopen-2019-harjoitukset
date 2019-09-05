import React from 'react'
import { createNote } from '../reducers/noteReducer'

const NoteForm = ({ store }) => {
  const addNote = (event) => {
    event.preventDefault()
    const content = event.target.note.value
    store.dispatch(createNote(content))
    event.target.note.value = ''
  }

  return (
    <div>
      <h2>Create a new note</h2>
      <form onSubmit={addNote}>
        <input name = "note"/>
        <button type="submit">save</button>
      </form>
    </div>
  )
}

export default NoteForm