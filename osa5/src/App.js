import React, { useState, useEffect } from 'react'
import Note from './components/Note'
import Notification from './components/Notification'
import noteService from './services/notes'

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

const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [isImportant, setImportance] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 

  const notesToShow = showAll ? notes : notes.filter(note => note.important === true)

  useEffect(() => {
    noteService
      .getAll()
      .then(initialNotes => {
        setNotes(initialNotes)
      })
  }, [])

  const toggleImportanceOf = (id) => {
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }
    noteService
      .update(id, changedNote)
      .then(returnedNote => {
        setNotes(notes.map(note => note.id !== id ? note : returnedNote))
      })
      .catch(error => {
        setErrorMessage(
          `Muistiinpano '${note.content}' poistettu palvelimelta`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
  }

  const deleteNote = (id) => {
    noteService
      .remove(id)
      .then(() => { setNotes(notes.filter(note => note.id !== id)) })
    //Note: tätä voi käyttää jos haluaa varmasti viimeisimmän tilan:
    /*      .then(() => axios.get('http://localhost:3001/notes')
            .then(response => {
              setNotes(response.data)
            })) */
  }

  const rows = () => notesToShow.map(note =>
    <Note
      key={note.id}
      note={note}
      toggleImportance={() => toggleImportanceOf(note.id)}
      deleteNote={() => deleteNote(note.id)}
    />
  )

  const addNote = (event) => {
    event.preventDefault() // Estetään "default" toiminta
    const noteObject = { // Luodaan objekti joka sisältää tarvittavat tiedot, kuten:
      content: newNote, // - Käyttöliittymässä annetun muistiinpanon
      date: new Date().toISOString(), // - Aikaleiman
      important: isImportant, // - Randomisti important-flagin
    }

    noteService
      .create(noteObject)
      .then(returnedNote => {
        setNotes(notes.concat(returnedNote))
        setNewNote('')
      })
  }

  const handleNoteChange = (event) => {
    setNewNote(event.target.value)
  }

  const Feedback = () => {
    if (newNote === '') {
      return (
        <div>
          <p>Palautekenttä on tyhjä. Kirjoita jotain.</p>
        </div>
      )
    }

    return (
      <div>
        <p>{notes.length + 1}. muistiinpano: "{newNote}"</p>
      </div>
    )
  }

  const handleCheckboxChange = (event) => {
    setImportance(!isImportant)
  }

  const Important = () => (
    <div>
      <input checked={isImportant} type="checkbox" id="important" onChange={handleCheckboxChange} />
      <label htmlFor="important">Tärkeä muistiinpano</label>
    </div>
  )

  const Button = () => {
    if (newNote === '') {
      return (
        <button disabled type="submit">tallenna</button>
      )
    }

    return (
      <button type="submit">tallenna</button>
    )
  }

  const handleLogin = (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)
  }

  return (
    <div>
      <h1>Muistiinpanot</h1>
      <Notification message={errorMessage} />
      <h2>Kirjautuminen</h2>
      <form onSubmit={handleLogin}>
        <div>
          Username
            <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          Password
            <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          näytä {showAll ? 'vain tärkeät' : 'kaikki'}
        </button>
        <h3>{showAll ? 'Kaikki' : 'Ainoastaan tärkeät'} muistiinpanot:</h3>
      </div>
      <ul>
        {rows()}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange} placeholder='Tee muistiinpano...' />
        <Button />
        <Important />
        <Feedback />
      </form>
      <Footer />
    </div>
  )
}

export default App