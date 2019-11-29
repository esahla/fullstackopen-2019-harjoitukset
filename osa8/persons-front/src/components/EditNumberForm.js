import React, { useState } from 'react'
import { Form, Button } from 'semantic-ui-react'

const EditNumberForm = ({ editPhone, notify }) => {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')

  const submit = async (event) => {
    event.preventDefault()
    const persoona = await editPhone({
      variables: { name, phone }
    })
    if (persoona) {
      notify(`Person ${name} number updated to ${phone}.`)
      setName('')
      setPhone('')
    }
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