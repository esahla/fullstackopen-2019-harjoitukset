import React from 'react'
import { Table, Button, } from 'semantic-ui-react'

const Person = ({ person, setter }) => {
  return (
    <Table.Row key={person.id}>
      <Table.Cell>{person.name}</Table.Cell>
      <Table.Cell>{person.phone ? person.phone : <i>N/A</i>}</Table.Cell>
      <Table.Cell><pre>{person.id}</pre></Table.Cell>
      <Table.Cell>
        <Button size='tiny' content='Details...' onClick={() => setter(person.name)} icon='info' labelPosition='left' />
      </Table.Cell>
    </Table.Row>
  )
}

export default Person