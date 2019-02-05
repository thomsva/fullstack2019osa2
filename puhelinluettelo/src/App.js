import React, { useState, useEffect } from 'react'
import Person from './components/Person'
import Notification from './components/Notification'
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
  const [notification, setNotification] = useState('')
  const [notificationType, setNotificationType] = useState('')

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
        .then(() => {
          setNotification('Henkilö ' + name + ' poistettu onnistuneesti.')
          setNotificationType('ok')
          setTimeout(() => {
            setNotification(null)
          }, 2000)
        })
        .catch(error => {
          console.log('delete operation failed')
          setNotification('Henkilö ' + name + ' poistettu  oli jo poistettu. Päivitetään näkymä.')
          setNotificationType('error')
          personService
            .getAll()
            .then(initialPersons => setPersons(initialPersons))
          setTimeout(() => {
            setNotification(null)
          }, 2000)
        })
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
      setNotification('Henkilön ' + personObject.name + ' lisääminen onnistui.')
      setNotificationType('ok')
      setTimeout(() => {
        setNotification(null)
      }, 2000)
    }
    else {
      if (window.confirm(`${newName} on jo luettelossa! Korvataanko vanha numero uudella?`)) {
        const personToBeChanged = persons.find(person => person.name === newName)
        const personUpdated = { ...personToBeChanged, number: newNumber }

        personService
          .update(personToBeChanged.id, personUpdated)
          .then(() => personService
            .getAll()
            .then(initialPersons => {
              setPersons(initialPersons)
            })
            .then(() => {
              setNewName('')
              setNewNumber('')
            })
            .then(() => {
              setNotification('Henkilön ' + personUpdated.name + ' muutos onnistui.')
              setNotificationType('ok')
              setTimeout(() => {
                setNotification(null)
              }, 2000)
            })
          )
          .catch(error => {
            console.log('Error, person has been deleted')
            personService
              .getAll()
              .then(initialPersons => setPersons(initialPersons))
            setNewName('')
            setNewNumber('')
            setNotification('Henkilö ' + personUpdated.name + ' oli jo poistettu.')
            setNotificationType('error')
            setTimeout(() => {
              setNotification(null)
            }, 2000)

          })


      }
    }

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
      <Notification message={notification} type={notificationType} />
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