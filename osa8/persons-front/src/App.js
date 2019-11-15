import React from 'react'
import { Container, } from 'semantic-ui-react'
import { gql } from 'apollo-boost'
import Persons from './components/Persons'
import { useQuery } from '@apollo/react-hooks'

const ALL_PERSONS = gql`
{
  allPersons  {
    name
    phone
    id
  }
}
`

const App = () => {
  const persons = useQuery(ALL_PERSONS)
  return (
    <Container>
      <h1>Persons</h1>
      <Persons result={persons} />
    </Container>
  )
}

export default App