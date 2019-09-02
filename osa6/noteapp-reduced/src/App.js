import React, { useState, useEffect } from 'react'
import Note from './components/Note'
import NoteForm from './components/NoteForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import noteService from './services/notes'
import loginService from './services/login'

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

const App = (props) => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [isImportant, setImportance] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [loginVisible, setLoginVisible] = useState(false)
  const noteFormRef = React.createRef()

  const store = props.store

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username,
        password,
      })

      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      )
      noteService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const notesToShow = showAll ? notes : notes.filter(note => note.important === true)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      noteService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    noteService
      .getAll()
      .then(initialNotes => { setNotes(initialNotes) })
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
    event.preventDefault()
    noteFormRef.current.toggleVisibility()
    const noteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: isImportant,
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

  // const Feedback = () => {
  //   if (newNote === '') {
  //     return (
  //       <div>
  //         <p>Tekstikenttä on tyhjä. Kirjoita jotain.</p>
  //       </div>
  //     )
  //   }

  //   return (
  //     <div>
  //       <p>{notes.length + 1}. muistiinpano: "{newNote}"</p>
  //     </div>
  //   )
  // }

  // const handleCheckboxChange = (event) => {
  //   setImportance(!isImportant)
  // }

  // const Important = () => (
  //   <div>
  //     <input checked={isImportant} type="checkbox" id="important" onChange={handleCheckboxChange} />
  //     <label htmlFor="important">Tärkeä muistiinpano</label>
  //   </div>
  // )

  // const Button = () => {
  //   if (newNote === '') {
  //     return (
  //       <button disabled type="submit">tallenna</button>
  //     )
  //   }

  //   return (
  //     <button type="submit">tallenna</button>
  //   )
  // }

  const loginForm = () => {
    const hideWhenVisible = { display: loginVisible ? 'none' : '' }
    const showWhenVisible = { display: loginVisible ? '' : 'none' }

    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setLoginVisible(true)}>Log in</button>
        </div>
        <div style={showWhenVisible}>
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
          <button onClick={() => setLoginVisible(false)}>cancel</button>
        </div>
      </div>
    )
  }

  const noteForm = () => (

    <div>
      <p>{user.name} logged in</p>
      <Togglable buttonLabel="new note" ref={noteFormRef}>
        <NoteForm
          onSubmit={addNote}
          value={newNote}
          handleChange={handleNoteChange}
        />
      </Togglable>
    </div>
  )

  return (
    <div>
      <h1>Muistiinpanot</h1>
      <Notification message={errorMessage} />
      <h2>Kirjautuminen</h2>
      {user === null ?
        loginForm() :
        <div>
          <p>{user.name} logged in</p>
          {noteForm()}
        </div>
      }

      <div>
        <button onClick={() => setShowAll(!showAll)}>
          näytä {showAll ? 'vain tärkeät' : 'kaikki'}
        </button>
        <h3>{showAll ? 'Kaikki' : 'Ainoastaan tärkeät'} muistiinpanot:</h3>
      </div>
      <ul>
        {rows()}
      </ul>
      <div>
        Reducerilla
        <ul>
          {store.getState().map(note =>
            <li key={note.id}>
              {note.content} <strong>{note.important ? 'important' : ''}</strong>
            </li>
          )}
        </ul>
      </div>

      <Footer />
    </div>
  )
}

export default App