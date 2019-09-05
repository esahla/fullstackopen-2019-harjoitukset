export const toggleImportanceOf = (id) => {
  return {
    type: 'TOGGLE_IMPORTANCE',
    data: { id }
  }
}

const generateId = () =>
  Number((Math.random() * 1000000).toFixed(0))

export const createNote = (content) => {
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

export const removeNote = (id) => {
  return (
    {
      type: 'REMOVE_NOTE',
      data: {
        id: id
      }
    }
  )
}

const noteReducer = (state = [], action) => {
  switch (action.type) {
    case 'NEW_NOTE':
      return [...state, action.data]
    case 'TOGGLE_IMPORTANCE':
      const id = action.data.id
      const noteToChange = state.find(n => n.id === id)
      const changedNote = {
        ...noteToChange,
        important: !noteToChange.important
      }
      return state.map(note =>
        note.id !== id ? note : changedNote
      )
    case 'REMOVE_NOTE':
      return state.filter(item => item.id !== action.data.id)
    default:
      return state
  }
}

export default noteReducer