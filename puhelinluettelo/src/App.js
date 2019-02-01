import React, { useState } from 'react'
import Person from './components/Person'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Martti Tienari', number: '040-123456' },
    { name: 'Arto Järvinen', number: '040-123456' },
    { name: 'Lea Kutvonen', number: '040-123456' }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    console.log('button pressed', event.target)
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

  const handleFilterChange = (event) => {
    setFilter(event.target.value)

  }

  const rows = () => persons
    .filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
    .map(person =>
      <Person
        key={person.name}
        person={person}
      />
    )

  return (
    <div>
      <h1>Puhelinluettelo</h1>
      <div>rajaa näytettäviä <input value={filter} onChange={handleFilterChange} /> </div>
      <h2>Lisää uusi</h2>
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