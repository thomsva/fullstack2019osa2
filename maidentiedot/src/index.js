import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom';
import axios from 'axios'


const Country = ({ country }) => (
  <div>
    <h1>{country.name}</h1>
    <p>Capital: {country.capital}</p>
    <p>Population: {country.population}</p>
    <h2>Languages</h2>
    <ul>
      {country.languages.map(language => <li>{language.name}</li>)}
    </ul>
    <img src={country.flag} alt='flag' width='200' ></img>
  </div>
)



const Countries = ({ countries, filter }) => {
  const filteredCountries = countries.filter(country => country.name.toLowerCase().includes(filter.toLowerCase()))
  if (filteredCountries.length === 1)
    return <Country country={filteredCountries[0]} />
  if (filteredCountries.length <= 10)
    return <ul> {filteredCountries.map(country =>
      <li key={country.alpha3Code}>
        {country.name} ({country.alpha3Code})
    </li>)}</ul>
  else
    return <p>Too many matches ({filteredCountries.length}), specify another filter.</p>
}

const Filter = ({ filter, handleFilterChange }) =>
  (<div>find countries<input value={filter} onChange={handleFilterChange} /> </div>)

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')

  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      })
  }, [])

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }


  return (
    <div>
      <h1>Maiden tiedot</h1>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <Countries countries={countries} filter={filter} />
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)