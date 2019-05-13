const mongoose = require('mongoose')

if ( process.argv.length<3 ) {
  console.log('give password as argument')
  process.exit(1)
}

//const password = process.argv[2]


const url = 'mongodb://esahla:admin123!@localhost:27017/mydatabase?retryWrites=true'
//`mongodb+srv://esahla-mongo-user-1:${password}@cluster0-3py3k.mongodb.net/note-app?retryWrites=true`


mongoose.connect(url, { useNewUrlParser: true }).catch(error => console.log(error))

const noteSchema = new mongoose.Schema({
  content: String,
  date: Date,
  important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

// const note = new Note({
//   content: 'HTML on todella HAUSKAA!! :) ',
//   date: new Date(),
//   important: true,
// })

// note.save().then(response => {
//    console.log('note saved!', response);
//    mongoose.connection.close();
//  })

Note.find({}).then(result => {
  result.forEach(note => {
    console.log(note)
  })
  mongoose.connection.close()
})
