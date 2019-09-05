import React from 'react'
import Note from './Note'
import { toggleImportanceOf, removeNote } from '../reducers/noteReducer'

const Notes = ({ store }) => {
  return (
    <ul>
      {store.getState().map(note =>
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