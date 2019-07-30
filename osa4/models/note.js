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
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
})

noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

mongoose.set('useFindAndModify', false)

module.exports = mongoose.model('Note', noteSchema)