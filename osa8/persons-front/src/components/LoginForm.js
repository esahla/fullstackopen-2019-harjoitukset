import React, { useState } from 'react'
import {
  Form
} from 'semantic-ui-react'

const LoginForm = ({ login, setToken, setUser }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e) => {
    try {
      const reply = await login({
        variables: { username, password }
      })
      window.localStorage.setItem('loggedUser', username)
      window.localStorage.setItem('loggedUserToken', reply.data.login.value)
      setToken(reply.data.login.value)
      setUser(username)
    } catch (error) {
      console.log('Error logging in:', error)
    }
  }

  return (
    <Form onSubmit={() => handleSubmit()}>
      <Form.Group>
        <Form.Input
          placeholder='Username'
          name='Username'
          autoComplete='username'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Form.Input
          placeholder='Password'
          name='password'
          autoComplete='current-password'
          value={password}
          type='password'
          onChange={(e) => setPassword(e.target.value)}
        />
        <Form.Button content='Submit' />
      </Form.Group>
    </Form>
  )
}

export default LoginForm