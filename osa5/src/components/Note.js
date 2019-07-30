import React from 'react'

const Note = ({ note, toggleImportance, deleteNote }) => {
  const label = note.important ? 'make not important' : 'make important'
  return (
    <li className={note.important ? 'important' : 'regular'}>
    {note.content}
    <button onClick={toggleImportance}>{label}</button>
    <button onClick={deleteNote}>Delete</button>
    </li>
  )
}

export default Note

