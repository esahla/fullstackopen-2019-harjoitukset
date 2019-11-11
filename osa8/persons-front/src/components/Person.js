import React from 'react'
import { Table, Button, } from 'semantic-ui-react'

const Person = ({ person, setter }) => {
  const renderPhone = () => {
    if (!person.phone) {
      return (
        <i>N/A</i>
      )
    }
    return (person.phone)
  }

  return (

    <Table.Row key={person.id}>
      <Table.Cell>{person.name}</Table.Cell>
      <Table.Cell>{renderPhone()}</Table.Cell>
      <Table.Cell><pre>{person.id}</pre></Table.Cell>
      <Table.Cell>
        <Button size='tiny' content='Details...' onClick={() => setter(person.name)} icon='info' labelPosition='left' />
      </Table.Cell>
    </Table.Row>

  )
}

export default Person