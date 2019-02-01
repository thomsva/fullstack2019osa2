import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom';
import axios from 'axios'


const Country = ({ country }) => {
  const [weather, setWeather] = useState(
    {
      temp_c: 0,
      condition: {
        text: "",
        icon: "",
      },
      wind_kph: 0,
      wind_dir: ""
    }
  )
  const capital = country.capital
  axios.get('http://api.apixu.com/v1/current.json?key=bc9e8d938c9b4791b10210640190102&q=' + capital)
    .then(response => setWeather(response.data.current)
    )
  console.log('weather', weather)
  return (
    <div>
      <h1>{country.name}</h1>
      <p>Capital: {country.capital}</p>
      <p>Population: {country.population}</p>
      <h2>Languages</h2>
      <ul>
        {country.languages.map(language =>
          <li key={language.name}>
            {language.name}
          </li>)}
      </ul>
      <img src={country.flag} alt='flag' width='200' ></img>

      <h2>Currently {weather.condition.text.toLowerCase()} in {country.capital}</h2>
      <p><b>temperature:</b> {weather.temp_c} Celsius</p>
      <img src={weather.condition.icon} alt='weather' ></img>
      <p><b>wind:</b> {weather.wind_kph} kph direction {weather.wind_dir}</p>

    </div>
  )
}


const Countries = ({ countries, filter, onSubmit, selected, weatherIcon }) => {
  const filteredCountries = countries.filter(country => country.name.toLowerCase().includes(filter.toLowerCase()))
  const n = filteredCountries.length
  if (selected !== '')
    return <Country country={countries.filter(country => country.alpha3Code === selected)[0]} weatherIcon={weatherIcon} />

  if (n === 0)
    return <p>No matches! Specify another filter.</p>
  if (n === 1)
    return <Country country={filteredCountries[0]} weatherIcon={weatherIcon} />
  if (n <= 10)
    return <div>
      {filteredCountries.map(country =>
        <form onSubmit={onSubmit} key={country.alpha3Code}>
          {country.name}({country.alpha3Code})

          <input type="hidden" name="code" value={country.alpha3Code} />
          <button type="submit">Show</button>

        </form>)
      }</div>
  else
    return <p>Too many matches ({n}), specify another filter.</p>
}

const Filter = ({ filter, handleFilterChange }) =>
  (<div>find countries<input value={filter} onChange={handleFilterChange} /> </div>)


const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')
  const [selected, setSelected] = useState('')

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
    setSelected('')
    setFilter(event.target.value)
  }

  const handleSelect = (event) => {
    event.preventDefault()
    console.log('show button pressed', event.target)
    setSelected(event.target.code.value)


    console.log('Selected country:', event.target.code.value)

  }


  return (
    <div>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <Countries countries={countries} filter={filter} selected={selected} onSubmit={handleSelect} />
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)