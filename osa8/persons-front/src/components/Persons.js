import React, { useState } from 'react'
import Person from './Person'
import PersonDetails from './PersonDetails'
import EditNumberForm from './EditNumberForm'
import PersonForm from './PersonForm'
import { Mutation } from 'react-apollo'
import { gql } from 'apollo-boost'
import {
  Table, Loader, Divider, Icon,
  Header, Grid,
  Message, Transition
} from 'semantic-ui-react'

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

const ALL_PERSONS = gql`
{
  allPersons  {
    name
    phone
    id
  }
}
`

const EDIT_NUMBER = gql`
mutation editNumber($name: String!, $phone: String!) {
  editNumber(name: $name, phone: $phone)  {
    name
    phone
    address {
      street
      city
    }
    id
  }
}
`


const Persons = ({ result, client }) => {
  const [person, setPerson] = useState(null)
  const [createErrorMessage, setCreateErrorMessage] = useState(null)
  const [editErrorMessage, setEditErrorMessage] = useState(null)
  const handleCreateError = (error) => {
    setCreateErrorMessage(error.graphQLErrors[0].message)
    setTimeout(() => {
      setCreateErrorMessage(null)
    }, 3000)
  }

  const handleEditError = (error) => {
    setEditErrorMessage(error)
    setTimeout(() => {
      setEditErrorMessage(null)
    }, 3000)
  }

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

  const checkNull = (response) => {
    if (!response.editNumber) {
      handleEditError('Given name does not exist')
    }
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
          <Transition visible={Boolean(createErrorMessage)} animation='swing down' duration={500}>
            <div>
              <Message
                error
                header='Error'
                content={createErrorMessage}
              />
            </div>
          </Transition>
          <Mutation mutation={CREATE_PERSON}
            refetchQueries={[{ query: ALL_PERSONS }]}
            onError={handleCreateError}
          >
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
              <Icon name='edit' />
              Edit number
            </Header>
          </Divider>
          <Transition visible={Boolean(editErrorMessage)} animation='swing down' duration={500}>
            <div>
              <Message
                error
                header='Error'
                content={editErrorMessage}
              />
            </div>
          </Transition>
          <Mutation mutation={EDIT_NUMBER}
            refetchQueries={[{ query: ALL_PERSONS }]}
            onError={handleCreateError}
            onCompleted={(n) => {checkNull(n)}}
          >
            {(editPhone) =>
              <EditNumberForm
                editPhone={editPhone}
              />
            }
          </Mutation>
        </Grid.Column>
      </Grid>
    </div>
  )

}

export default Persons