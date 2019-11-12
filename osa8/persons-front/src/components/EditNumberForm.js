import React, { useState } from 'react'
import { Form, Button } from 'semantic-ui-react'

const EditNumberForm = ({ editPhone }) => {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')

  const submit = async (event) => {
    event.preventDefault()
    await editPhone({
      variables: { name, phone }
    })
    setName('')
    setPhone('')
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
        <Button primary content='Edit Number' type='submit' icon='edit' labelPosition='left' />
      </Form>
    </div>
  )
}


export default EditNumberForm