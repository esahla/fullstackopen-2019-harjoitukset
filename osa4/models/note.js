// const url =
//     'mongodb+srv://esahla-mongo-user-1:MYUQv7T4hHFbphqY@cluster0-3py3k.mongodb.net/note-app?retryWrites=true'
//     `mongodb://esahla:admin123!@localhost:27017/mydatabase?retryWrites=true`

const mongoose = require('mongoose')

const noteSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
    minlength: 5
  },
  date: Date,
  important: Boolean,
})

noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Note', noteSchema)