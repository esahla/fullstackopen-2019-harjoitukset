import React from 'react'

const Note = ({ note, toggleImportance, deleteNote }) => {
  const label = note.important ? 'make not important' : 'make important'
  return (
    <li className='note'>
      <span onClick={toggleImportance}>{note.content}</span> 
      <strong>{note.important ? ' important ' : ''}</strong>
      <button onClick={toggleImportance}>{label}</button>
      <button onClick={deleteNote}>Delete</button>
    </li>
  )
}

export default Note
