import React, { useState } from 'react'
import Person from './components/Person'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '1234567' }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    console.log('button pressed', event.target)

    console.log('exists', persons.find(person => person.name === newName) === undefined)



    if (persons.find(person => person.name === newName) === undefined) {
      setPersons(persons.concat({ name: newName, number: newNumber }))
      setNewName('')
      setNewNumber('')
    }
    else
      alert(`${newName} on jo luettelossa!!!`)
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const rows = () => persons.map(person =>
    <Person
      key={person.name}
      person={person}
    />
  )

  return (
    <div>
      <h2>Puhelinluettelo</h2>
      <form onSubmit={addPerson}>
        <div>nimi: <input value={newName} onChange={handleNameChange} /></div>
        <div>numero: <input value={newNumber} onChange={handleNumberChange} /></div>
        <div><button type="submit">lisää</button></div>
      </form>
      <h2>Numerot</h2>
      {rows()}
    </div>
  )

}

export default App