import React from 'react'
import { connect } from 'react-redux'
import { filterChange } from '../reducers/filterReducer'

const VisibilityFilter = (props) => {
  const filterSelected = (value) => () => {
    props.filterChange(value)
  }

  return (
    <div>
      all <input type="radio" name="filter" onChange={filterSelected('ALL')} />
      important <input type="radio" name="filter" onChange={filterSelected('IMPORTANT')} />
      nonimportant <input type="radio" name="filter" onChange={filterSelected('NONIMPORTANT')} />
    </div>
  )
} 

export default connect(
  null,
  { filterChange }
)(VisibilityFilter)
