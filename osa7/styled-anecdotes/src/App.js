import React, { useState } from 'react'
import ListGroup from 'react-bootstrap/ListGroup'
import Toast from 'react-bootstrap/Toast'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import {
  BrowserRouter as Router,
  Route, Link, withRouter
} from 'react-router-dom'

const Menu = () => {

  const padding = { paddingRight: 5 }

  return (
    <div>
      <Link style={padding} to="/">anecdotes</Link>
      <Link style={padding} to="/create">create new</Link>
      <Link style={padding} to="/about">about</Link>
    </div>
  )
}

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ListGroup>
      {anecdotes.map(anecdote =>
        <ListGroup.Item key={anecdote.id} >
          <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
        </ListGroup.Item>)
      }
    </ListGroup>
  </div>
)

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>An anecdote is a brief, revealing account of an individual person or an incident.
      Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
      such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
      An anecdote is "a story with a point."</em>

    <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
  </div>
)

const Footer = () => (
  <div>
    Anecdote app for <a href='https://courses.helsinki.fi/fi/tkt21009'>Full Stack -sovelluskehitys</a>.

    See <a href='https://github.com/fullstack-hy2019/routed-anecdotes/blob/master/src/App.js'>https://github.com/fullstack-hy2019/routed-anecdotes/blob/master/src/App.js</a> for the source code.
  </div>
)

const AnecdoteComponent = (props) => (
  <div>
    <h2>{props.anecdote.content} by {props.anecdote.author}</h2>
    <p>has {props.anecdote.votes} votes</p>
    <p>for more, see {props.anecdote.info}</p>
    <button href="#" onClick={() => { props.history.push('/') }}>&#60;&#60; Back to Anecdotes</button>
  </div>
)


const Notification = ({ message }) => {
  if (message === '') {
    return null
  }

  return (
    <div
      aria-live="polite"
      aria-atomic="true"
      style={{
        position: 'relative',
        minHeight: '100px',
      }}
    >
      <Toast
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
        }}
      >
        <Toast.Header>
          <img src="holder.js/20x20?text=%20" className="rounded mr-2" alt="" />
          <strong className="mr-auto">Notification</strong>
        </Toast.Header>
        <Toast.Body>{message}</Toast.Body>
      </Toast>
    </div>
  )
}

const CreateNew = (props) => {
  const [content, setContent] = useState('')
  const [author, setAuthor] = useState('')
  const [info, setInfo] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content,
      author,
      info,
      votes: 0
    })
    props.history.push('/')
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Label>content</Form.Label>
        <Form.Control name='content' value={content} onChange={(e) => setContent(e.target.value)} />
        <Form.Label>author</Form.Label>
        <Form.Control name='author' value={author} onChange={(e) => setAuthor(e.target.value)} />
        <Form.Label>url for more info</Form.Label>
        <Form.Control name='info' value={info} onChange={(e) => setInfo(e.target.value)} />
        <Button variant="primary" type="submit">create</Button>
      </Form>
    </div>
  )
}

const Creator = withRouter(CreateNew)
const Anecdote = withRouter(AnecdoteComponent)

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 1,
      id: '1'
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 10,
      id: '2'
    },
    {
      content: 'Any fool can write code',
      author: 'Someone',
      info: 'http://some.one.com',
      votes: 1001,
      id: '3'
    }
  ])

  const [notification, setNotification] = useState('')

  const addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    setAnecdotes(anecdotes.concat(anecdote))
    setNotification(`a new anecdote ${anecdote.content} created!`)
    setTimeout(() => {
      setNotification('')
    }, 10000)
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  // TÄTÄ EI TARVITTU TEHTÄVÄN TEKEMISEEN
  // 
  // const vote = (id) => {
  //   const anecdote = anecdoteById(id)
  //   const voted = {
  //     ...anecdote,
  //     votes: anecdote.votes + 1
  //   }
  //   setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  // }

  return (
    <Router>
      <div class="container">
        <h1>Software anecdotes</h1>
        <Menu />
        <Notification message={notification} />
        <Route exact path="/" render={() => <AnecdoteList anecdotes={anecdotes} />} />
        <Route exact path="/anecdotes/:id" render={({ match }) =>
          <Anecdote anecdote={anecdoteById(match.params.id)} />}
        />
        <Route path="/about" render={() => <About />} />
        <Route path="/create" render={() => <Creator addNew={addNew} />} />
        <Footer />
      </div>
    </Router>
  )
}

export default App