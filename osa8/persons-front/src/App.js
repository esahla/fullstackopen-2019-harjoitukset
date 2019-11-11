import React from 'react'
import { Container } from 'semantic-ui-react'
import { Query, ApolloConsumer } from 'react-apollo'
import { gql } from 'apollo-boost'
import Persons from './components/Persons'

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
  return (
    <Container>
      <h1>Persons</h1>
      <ApolloConsumer>
        {(client =>
          <Query query={ALL_PERSONS} pollInterval={2000}>
            {(result) => <Persons result={result} client={client}/>}
          </Query>
        )}
      </ApolloConsumer>
    </Container>
  )
}

export default App