import React, { useState, useEffect } from 'react'
import Person from './Person'
import PersonDetails from './PersonDetails'
import EditNumberForm from './EditNumberForm'
import PersonForm from './PersonForm'
import LoginForm from './LoginForm'
import { gql } from 'apollo-boost'
import {
  Table, Loader, Divider, Icon,
  Header, Grid, Segment,
  Message, Transition, Button,
  Label,
} from 'semantic-ui-react'
import { useMutation } from '@apollo/react-hooks'
import { useApolloClient } from '@apollo/react-hooks'

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

const LOGIN = gql`
mutation login($username: String!, $password: String!) {
  login(username: $username, password: $password)  {
    value
  }
}
`

const DELETE = gql`
mutation deletePerson($name: String!) {
  deletePerson(name: $name)  {
    name
    id
  }
}
`

const Persons = ({ result }) => {
  const client = useApolloClient()
  const [person, setPerson] = useState('')
  const [createErrorMessage, setCreateErrorMessage] = useState(null)
  const [editErrorMessage, setEditErrorMessage] = useState(null)
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)

  useEffect(() => {
    const user = window.localStorage.getItem('loggedUser')
    const token = window.localStorage.getItem('loggedUserToken')
    if (user) {
      setToken(token)
      setUser(user)
    }
  }, [])

  const handleError = (error) => {
    console.log("Error!", error)
  }

  const handleCreateError = (error) => {
    setCreateErrorMessage(error.graphQLErrors[0].message)
    setTimeout(() => {
      setCreateErrorMessage(null)
    }, 5000)
  }

  const handleEditError = (error) => {
    setEditErrorMessage(error.graphQLErrors[0].message)
    setTimeout(() => {
      setEditErrorMessage(null)
    }, 5000)
  }

  const [addPerson] = useMutation(CREATE_PERSON, {
    onError: handleCreateError,
    refetchQueries: [{ query: ALL_PERSONS }]
  })

  const [editPhone] = useMutation(EDIT_NUMBER, {
    refetchQueries: [{ query: ALL_PERSONS }],
    onError: handleEditError,
    onCompleted: (n) => { checkNull(n) }
  })

  const [login] = useMutation(LOGIN, {
    onError: handleError
  })

  const [deletePerson] = useMutation(DELETE, {
    refetchQueries: [{ query: ALL_PERSONS }],
    onError: handleError
  })

  const displayResults = () => {
    if (result.data) {
      return (
        result.data.allPersons.map(person =>
          <Person key={person.id} person={person} setter={(n) => showPerson(n)} deleter={(n) => deletePerson(n)} />
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

  const renderLoginButton = () => {
    return (
      <div>
        <Label size='large' color='green'>
          <Icon name='user outline'/>
          {user} logged in
        </Label>
        <Button onClick={() => handleLogout()}>Logout</Button>
      </div>
    )
  }

  const handleLogout = () => {
    setUser(null)
    setToken(null)
    window.localStorage.removeItem('loggedUser')
    window.localStorage.removeItem('loggedUserToken')
    client.resetStore()
  }

  if (!token) {
    return (
      <div>
        <h2>Login</h2>
        <LoginForm
          login={login}
          setToken={(token) => setToken(token)}
          setUser={(user) => setUser(user)}
        />
      </div>
    )
  }
  return (
    <div>
      {renderLoginButton()}
      <Divider horizontal>
        <Header as='h3'>
          <Icon name='list alternate outline' />
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
              <Icon name='add user' />
              Add a new person
          </Header>
          </Divider>
          <Segment raised>
            <Transition visible={Boolean(createErrorMessage)} animation='swing down' duration={500}>
              <div>
                <Message
                  error
                  header='Error'
                  content={createErrorMessage}
                />
              </div>
            </Transition>
            <PersonForm addPerson={addPerson} />
          </Segment>
        </Grid.Column>
        <Grid.Column floated='left' width={8}>
          <Divider horizontal>
            <Header as='h3'>
              <Icon name='edit' />
              Edit number
            </Header>
          </Divider>
          <Segment raised>
            <Transition visible={Boolean(editErrorMessage)} animation='swing down' duration={500}>
              <div>
                <Message
                  error
                  header='Error'
                  content={editErrorMessage}
                />
              </div>
            </Transition>
            <EditNumberForm editPhone={editPhone} />
          </Segment>
        </Grid.Column>
      </Grid>
    </div>
  )
}

export default Persons