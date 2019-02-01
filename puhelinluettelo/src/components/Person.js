import React from 'react'

const Person = props => {
  console.log('props:', props)
  return (
    <p>{props.person.name}</p>
  )
}

export default Person