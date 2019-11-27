import React from 'react'
import { Table, Button, Popup } from 'semantic-ui-react'

const Person = ({ person, setter, deleter }) => {
  const handleDelete = async () => {
    await deleter({
      variables: { name: person.name }
    })
  }
  const infoContent = () => (`More information about ${person.name}`)

  const deleteContent = () => (`Delete person ${person.name}`)

  return (
    <Table.Row key={person.id}>
      <Table.Cell>{person.name}</Table.Cell>
      <Table.Cell>{person.phone ? person.phone : <i>N/A</i>}</Table.Cell>
      <Table.Cell><pre>{person.id}</pre></Table.Cell>
      <Table.Cell>
        <Popup basic content={infoContent} trigger={<Button size='tiny' onClick={() => setter(person.name)} icon='info' />} />
        <Popup basic content={deleteContent} trigger={<Button color='red' size='tiny' onClick={() => handleDelete()} icon='remove' />} />
      </Table.Cell>
    </Table.Row>
  )
}

export default Person