const Note = require('../models/note')
const User = require('../models/user')
const bcrypt = require('bcrypt')

const initialNotes = [
  {
    content: 'HTML on helppoa',
    important: false
  },
  {
    content: 'HTTP-protokollan tärkeimmät metodit ovat GET ja POST',
    important: true
  }
]

const nonExistingId = async () => {
  const note = new Note({ content: 'willremovethissoon' })
  await note.save()
  await note.remove()

  return note._id.toString()
}

const notesInDb = async () => {
  const notes = await Note.find({})
  return notes.map(note => note.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

const createTestUser = async () => {
  const testUserName = 'autotester01'
  const testName = 'Timo Testaaja'
  const testPassword = 'autotester123'

  const passwordHash = await bcrypt.hash(testPassword, 10)

  const testUser = new User({
    username: testUserName,
    name: testName,
    passwordHash
  })
  await testUser.save()
}

module.exports = {
  initialNotes,
  nonExistingId,
  notesInDb,
  usersInDb,
  createTestUser,
}