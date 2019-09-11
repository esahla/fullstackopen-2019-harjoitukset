import React from 'react'
import { connect } from 'react-redux'
import { createNote } from '../reducers/noteReducer'

const NoteForm = (props) => {
  console.log(createNote)
  console.log(props.createNote)
  
  const addNote = (event) => {
    event.preventDefault()
    const content = event.target.note.value
    props.createNote(content)
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

export default connect(
  null,
  { createNote }
)(NoteForm)
