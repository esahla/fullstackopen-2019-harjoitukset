import React from 'react'
import { connect } from 'react-redux'
import { createNote } from '../reducers/noteReducer'
import noteService from '../services/notes'

const NoteForm = (props) => {
  const addNote = async (event) => {
    event.preventDefault()
    const content = event.target.note.value
    event.target.note.value = ''
    const newNote = await noteService.create(content)
    console.log(newNote)
    props.createNote(newNote)
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

export default connect(
  null,
  { createNote }
)(NoteForm)
