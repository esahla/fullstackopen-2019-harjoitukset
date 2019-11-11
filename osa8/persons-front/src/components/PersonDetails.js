import React from 'react'
import { Card, Button, Icon } from 'semantic-ui-react'

const PersonDetails = ({ person, closer }) => {
  const renderPhone = () => {
    if(!person.phone) {
      return (
        <i>N/A</i>
      )
    }
    return (person.phone)
  }

  return (
    <Card color='blue'>
      <Card.Content>
        <Card.Header as='h3'>{person.name}</Card.Header>
      </Card.Content>
      <Card.Content>
        <Icon circular inverted name='phone' />
        {renderPhone()}
        <br/>
        <Icon circular inverted name='map marker alternate' />{person.address.street}, {person.address.city}
      </Card.Content>
      <Card.Content extra>
        <Button content='Close' primary onClick={() => closer()} icon='close' labelPosition='left'/>
      </Card.Content>
    </Card>
  )
}

export default PersonDetails