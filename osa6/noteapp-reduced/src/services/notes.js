import axios from 'axios'
const baseUrl = '/notes'

// let token = null

// const setToken = newToken => {
//   token = `bearer ${newToken}`
// }

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async (content) => {
  // const config = {
  //   headers: { Authorization: token },
  // }
  const object = { content, important: false }
  const response = await axios.post(baseUrl, object)
  return response.data
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}

const remove = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`)
  return request.then(response => response.data)
}

export default {
  getAll,
  create,
  update,
  remove,
  // setToken,
}