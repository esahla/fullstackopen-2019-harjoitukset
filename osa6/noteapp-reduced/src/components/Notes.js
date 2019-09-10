import React from 'react'
import { connect } from 'react-redux'
import Note from './Note'
import { toggleImportanceOf, removeNote } from '../reducers/noteReducer'

const Notes = (props) => {
  const notesToShow = () => {
    if (props.filter === 'ALL') {
      return props.notes
    }

    return props.filter === 'IMPORTANT'
      ? props.notes.filter(note => note.important)
      : props.notes.filter(note => !note.important)
  }

  return (
    <ul>
      {notesToShow().map(note =>
        <Note
          key={note.id}
          note={note}
          toggleImportance={() => props.toggleImportanceOf(note.id)}
          deleteNote={() => props.removeNote(note.id)}
        />
      )}
    </ul>
  )
}

const mapStateToProps = (state) => {
  return {
    notes: state.notes,
    filter: state.filter,
  }
}

const mapDispatchToProps = {
  toggleImportanceOf,
  removeNote
}

const ConnectedNotes = connect(
  mapStateToProps,
  mapDispatchToProps
)(Notes)

export default ConnectedNotes