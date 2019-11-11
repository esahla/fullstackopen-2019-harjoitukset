import React, { useState } from 'react'
import Person from './Person'
import PersonDetails from './PersonDetails'
import PersonForm from './PersonForm'
import { Mutation } from 'react-apollo'
import { gql } from 'apollo-boost'
import { Table, Loader, Divider, Icon, Header, Grid, Placeholder, Segment } from 'semantic-ui-react'

const FIND_PERSON = gql`
  query findPersonByName($nameToSearch: String!) {
    findPerson(name: $nameToSearch) {
      name
      phone 
      id
      address {
        street
        city
      }
    }
  }
`

const CREATE_PERSON = gql`
mutation createPerson($name: String!, $street: String!, $city: String!, $phone: String) {
  addPerson(
    name: $name,
    street: $street,
    city: $city,
    phone: $phone
  ) {
    name
    phone
    id
    address {
      street
      city
    }
  }
}
`

const Persons = ({ result, client }) => {
  const [person, setPerson] = useState(null)

  const displayResults = () => {
    if (result.data) {
      return (
        result.data.allPersons.map(person =>
          <Person key={person.id} person={person} setter={(n) => showPerson(n)} />
        )
      )
    }
    if (!result.data) {
      return
    }
  }

  const showPerson = async (name) => {
    const { data } = await client.query({
      query: FIND_PERSON,
      variables: { nameToSearch: name }
    })
    setPerson(data.findPerson)
  }

  if (result.loading) {
    return (<Loader>Loading</Loader>)
  }

  if (person) {
    return (
      <PersonDetails person={person} closer={() => setPerson(null)} />
    )
  }



  return (
    <div>
      <Divider horizontal>
        <Header as='h3'>
          <Icon name="table" />
          List of persons
          </Header>
      </Divider>
      <Table color='blue'>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Phone</Table.HeaderCell>
            <Table.HeaderCell>ID</Table.HeaderCell>
            <Table.HeaderCell>Actions</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {displayResults()}
        </Table.Body>
      </Table>
      <br />

      <Grid>
        <Grid.Column floated='left' width={8}>
          <Divider horizontal>
            <Header as='h3'>
              <Icon name="user" />
              Add a new person
          </Header>
          </Divider>
          <Mutation mutation={CREATE_PERSON}>
            {(addPerson) =>
              <PersonForm
                addPerson={addPerson}
              />
            }
          </Mutation>
        </Grid.Column>

        <Grid.Column floated='left' width={8}>
          <Divider horizontal>
            <Header as='h3'>
              <Icon name="question" />
              Something else
          </Header>
          </Divider>
          <Segment raised>
            <Placeholder>
              <Placeholder.Header image>
                <Placeholder.Line />
                <Placeholder.Line />
              </Placeholder.Header>
              <Placeholder.Paragraph>
                <Placeholder.Line length='medium' />
                <Placeholder.Line length='short' />
              </Placeholder.Paragraph>
            </Placeholder>
            <Placeholder>
              <Placeholder.Header image>
                <Placeholder.Line />
                <Placeholder.Line />
              </Placeholder.Header>
              <Placeholder.Paragraph>
                <Placeholder.Line length='medium' />
                <Placeholder.Line length='short' />
              </Placeholder.Paragraph>
            </Placeholder>
          </Segment>
        </Grid.Column>
      </Grid>
    </div>
  )

}

export default Persons