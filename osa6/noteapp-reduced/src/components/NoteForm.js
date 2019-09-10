import React from 'react'
import { connect } from 'react-redux'
import { createNote } from '../reducers/noteReducer'

const NoteForm = (props) => {
  const addNote = (event) => {
    event.preventDefault()
    const content = event.target.note.value
    props.store.dispatch(createNote(content))
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

const ConnectedNoteForm = connect()(NoteForm)
export default ConnectedNoteForm