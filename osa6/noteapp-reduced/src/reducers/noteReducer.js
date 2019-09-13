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
    case 'INIT_NOTES':
      return action.data
    default:
      return state
  }
}

export const toggleImportanceOf = (id) => {
  return {
    type: 'TOGGLE_IMPORTANCE',
    data: { id }
  }
}

export const createNote = (content) => {
  return (
    {
      type: 'NEW_NOTE',
      data: content,
    }
  )
}

export const removeNote = (id) => {
  return (
    {
      type: 'REMOVE_NOTE',
      data: { id },
    }
  )
}

export const initializeNotes = (notes) => {
  return (
    {
      type: 'INIT_NOTES',
      data: notes,
    }
  )
}

export default noteReducer