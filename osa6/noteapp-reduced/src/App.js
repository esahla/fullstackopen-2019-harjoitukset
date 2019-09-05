import React from 'react'

const Footer = () => {
  const footerStyle = {
    color: 'green',
    fontStyle: 'italic',
    fontSize: 12
  }

  return (
    <div style={footerStyle}>
      <br />
      <hr />
      <em>Note app, esahla, 2019</em>
    </div>
  )
}

const generateId = () =>
  Number((Math.random() * 1000000).toFixed(0))

const App = (props) => {
  const store = props.store
  const addNote = (event) => {
    event.preventDefault()
    const content = event.target.note.value
    store.dispatch(createNote(content))
    event.target.note.value = ''
  }

  const createNote = (content) => {
    return (
      {
        type: 'NEW_NOTE',
        data: {
          content,
          important: false,
          id: generateId()
        }
      }
    )
  }

  const toggleImportance = (id) => () => {
    store.dispatch(toggleImportanceOf(id))
  }

  const toggleImportanceOf = (id) => {
    return {
      type: 'TOGGLE_IMPORTANCE',
      data: { id }
    }
  }

  // const printteri = (event) => {
  //   console.log(event.target.value)
  // }

  return (
    <div>
      <form onSubmit={addNote}>
        <input name="note" /* onChange={printteri} */ />
        <button type="submit">add</button>
      </form>
      <ul>
        {store.getState().map(note =>
          <li key={note.id} onClick={toggleImportance(note.id)}>
            {note.content} <strong>{note.important ? 'important' : ''}</strong>
          </li>
        )}
      </ul>
      <Footer />
    </div>
  )
}

export default App