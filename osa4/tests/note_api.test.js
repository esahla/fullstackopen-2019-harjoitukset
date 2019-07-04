const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Note = require('../models/note')
const User = require('../models/user')
let theToken = {}

beforeAll(async () => {
  await User.deleteMany({})
  await helper.createTestUser()
  theToken = await api
    .post('/api/login')
    .send({ username: 'autotester01', password: 'autotester123' })
})

describe('when there are initially some notes saved then', () => {
  beforeEach(async () => {
    await Note.remove({})
    const noteObjects = helper.initialNotes.map(note => new Note(note))
    const promiseArray = noteObjects.map(note => note.save())
    await Promise.all(promiseArray)
  })

  test('notes are returned as json', async () => {
    await api
      .get('/api/notes')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all notes are returned', async () => {
    const response = await api.get('/api/notes')
    expect(response.body.length).toBe(helper.initialNotes.length)
  })

  test('a specific note is within the returned notes', async () => {
    const response = await api.get('/api/notes')

    const contents = response.body.map(r => r.content)

    expect(contents).toContain(
      'HTTP-protokollan tärkeimmät metodit ovat GET ja POST'
    )
  })

  describe('and when adding a new note', () => {
    test('a valid note can be added ', async () => {
      const newNote = {
        content: 'async/await yksinkertaistaa asynkronisten funktioiden kutsua',
        important: true,
      }

      await api
        .post('/api/notes')
        .send(newNote)
        .set('Authorization', `bearer ${theToken.body.token}`)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      const notesAtEnd = await helper.notesInDb()
      expect(notesAtEnd.length).toBe(helper.initialNotes.length + 1)

      const contents = notesAtEnd.map(n => n.content)
      expect(contents).toContain(
        'async/await yksinkertaistaa asynkronisten funktioiden kutsua'
      )
    })

    test('a too short note cannot be added ', async () => {
      const newNote = {
        content: 'mini',
        important: false,
      }

      await api
        .post('/api/notes')
        .send(newNote)
        .set('Authorization', `bearer ${theToken.body.token}`)
        .expect(400)
        .expect('Content-Type', /application\/json/)

      const notesAtEnd = await helper.notesInDb()

      expect(notesAtEnd.length).toBe(helper.initialNotes.length)
    })

    test('note without content is not added', async () => {
      const newNote = {
        important: true
      }

      await api
        .post('/api/notes')
        .send(newNote)
        .set('Authorization', `bearer ${theToken.body.token}`)
        .expect(400)

      const notesAtEnd = await helper.notesInDb()

      expect(notesAtEnd.length).toBe(helper.initialNotes.length)
    })
  })

  describe('and when viewing a note', () => {

    test('a specific note can be viewed', async () => {
      const notesInDBAtStart = await helper.notesInDb()
      const noteToView = notesInDBAtStart[0]

      const resultNote = await api
        .get(`/api/notes/${noteToView.id}`)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      expect(resultNote.body).toEqual(noteToView)
    })

    test('fails with statuscode 404 if note does not exist', async () => {
      const validNonexistingId = await helper.nonExistingId()

      await api
        .get(`/api/notes/${validNonexistingId}`)
        .expect(404)
    })

    test('fails with statuscode 400 id is invalid', async () => {
      const invalidId = '5a3d5da59070081a82a3445'

      await api
        .get(`/api/notes/${invalidId}`)
        .expect(400)
    })
  })

  describe('and deletion of a note', () => {
    test('succeeds with a valid id with status code HTTP 200', async () => {
      const notesAtStart = await helper.notesInDb()
      const noteToDelete = notesAtStart[0]

      await api
        .delete(`/api/notes/${noteToDelete.id}`)
        .expect(204)

      const notesAfterDelete = await helper.notesInDb()

      expect(notesAfterDelete.length).toBe(helper.initialNotes.length - 1)

      const contents = notesAfterDelete.map(r => r.content)
      expect(contents).not.toContain(noteToDelete.content)
    })

    afterAll(() => {
      mongoose.connection.close()
    })
  })
})
