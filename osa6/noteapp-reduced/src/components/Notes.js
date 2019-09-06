import React from 'react'
import Note from './Note'
import { toggleImportanceOf, removeNote } from '../reducers/noteReducer'

const Notes = ({ store }) => {
  const { notes, filter } = store.getState()
  const notesToShow = () => {
    if (filter === 'ALL') { return notes }
    return (
      filter === 'IMPORTANT' ? notes.filter(note => note.important) : notes.filter(note => !note.important) 
    )
  }

  return (
    <ul>
      {notesToShow().map(note =>
        <Note
          key={note.id}
          note={note}
          toggleImportance={() => store.dispatch(toggleImportanceOf(note.id))}
          deleteNote={() => store.dispatch(removeNote(note.id))}
        />
      )}
    </ul>
  )
}

export default Notes