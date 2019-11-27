import React, { useState } from 'react'
import { Form, Button } from 'semantic-ui-react'

const PersonForm = (props) => {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [street, setStreet] = useState('')
  const [city, setCity] = useState('')

  const submit = async (event) => {
    event.preventDefault()
    await props.addPerson({
      variables: { name, street, city, phone: phone.length>0 ? phone : null }
    })
    setName('')
    setPhone('')
    setStreet('')
    setCity('')
  }

  return (
    <div>
      <Form onSubmit={submit}>
        <Form.Field>
          <label>Name</label>
          <input
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </Form.Field>
        <Form.Field>
          <label>Phone</label>
          <input
            value={phone}
            onChange={({ target }) => setPhone(target.value)}
          />
        </Form.Field>
        <Form.Field>
          <label>Street</label>
          <input
            value={street}
            onChange={({ target }) => setStreet(target.value)}
          />
        </Form.Field>
        <Form.Field>
          <label>City</label>
          <input
            value={city}
            onChange={({ target }) => setCity(target.value)}
          />
        </Form.Field>
        <Button primary content='Add' type='submit' icon='user plus' labelPosition='left' />
      </Form>
    </div>
  )
}

export default PersonForm