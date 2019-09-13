import React from 'react'
import { connect } from 'react-redux'
import Note from './Note'
import noteService from '../services/notes'
import { toggleImportanceOf, removeNote } from '../reducers/noteReducer'

const Notes = (props) => {
  const deleteNote = async (id) => {
    await noteService.remove(id)
    props.removeNote(id)
  }
  return (
    <ul>
      {props.visibleNotes.map(note =>
        <Note
          key={note.id}
          note={note}
          toggleImportance={() => props.toggleImportanceOf(note.id)}
          deleteNote={() => deleteNote(note.id)}
        />
      )}
    </ul>
  )
}

const notesToShow = ({ notes, filter }) => {
  if (filter === 'ALL') {
    return notes
  }
  return filter === 'IMPORTANT'
    ? notes.filter(note => note.important)
    : notes.filter(note => !note.important)
}

const mapStateToProps = (state) => (
  { visibleNotes: notesToShow(state) }
)

const mapDispatchToProps = {
  toggleImportanceOf,
  removeNote
}

const ConnectedNotes = connect(
  mapStateToProps,
  mapDispatchToProps
)(Notes)

export default ConnectedNotes