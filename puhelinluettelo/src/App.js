import React, { useState, useEffect } from 'react'
import Person from './components/Person'
import personService from './services/persons'


const PersonForm = (props) => {
  return (
    <form onSubmit={props.onSubmit}>
      <div>nimi: <input value={props.newName} onChange={props.handleNameChange} /></div>
      <div>numero: <input value={props.newNumber} onChange={props.handleNumberChange} /></div>
      <div><button type="submit">lisää</button></div>
    </form>
  )
}

const Persons = ({ persons, filter, removePerson }) => {


  return (
    <div>
      {persons
        .filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
        .map(person =>
          <Person
            key={person.name}
            person={person}
            deletePressed={() => removePerson(person.id, person.name)}
          />
        )}
    </div>
  )
}

const Filter = ({ filter, handleFilterChange }) =>
  (<div>rajaa näytettäviä <input value={filter} onChange={handleFilterChange} /> </div>)




const App = () => {
  const [persons, setPersons] = useState([])

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  const removePerson = (id, name) => {
    console.log('pressed delete button for ', id)
    if (window.confirm(`Haluatko varmasti poistaa ${name}?`)) {
      personService
        .remove(id)
        .then(() => personService
          .getAll()
          .then(initialPersons => {
            setPersons(initialPersons)
          }))
    }
  }

  const addPerson = (event) => {
    event.preventDefault()
    console.log('button pressed', event.target)
    const personObject = {
      name: newName,
      number: newNumber
    }

    if (persons.find(person => person.name === newName) === undefined) {
      personService
        .create(personObject)
        .then(response => {
          setPersons(persons.concat({ name: newName, number: newNumber, id: response.id }))
          setNewName('')
          setNewNumber('')
        })
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


  return (
    <div>
      <h1>Puhelinluettelo</h1>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />

      <h2>Lisää uusi</h2>
      <PersonForm handleNameChange={handleNameChange}
        newName={newName}
        handleNumberChange={handleNumberChange}
        newNumber={newNumber}
        onSubmit={addPerson}
      />
      <h2>Numerot</h2>
      <Persons persons={persons} filter={filter} removePerson={removePerson} />
    </div>
  )

}

export default App