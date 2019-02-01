import React from 'react'
import ReactDOM from 'react-dom'

const Course = props => {
  console.log(props)
  return (
    <div>
      <Header course={props.course.name} />
      <Content parts={props.course.parts} />
      <Total parts={props.course.parts} />
    </div>
  )
}

const Header = props =>
  <h1>{props.course}</h1>


const Content = props => (
  <ul>
    {props.parts.map(part => <Part key={part.id} part={part} />)}
  </ul>
)

const Part = props =>
  <p>{props.part.name} {props.part.exercises}</p>

const Total = props => {
  const total = props.parts.reduce(function (sum, part) {
    console.log("part", part)
    return sum + part.exercises
  }, 0)

  return <p>yhteensä {total} tehtävää</p>
}

const App = () => {
  const course = {
    name: 'Half Stack -sovelluskehitys',
    parts: [
      {
        name: 'Reactin perusteet',
        exercises: 10,
        id: 1
      },
      {
        name: 'Tiedonvälitys propseilla',
        exercises: 7,
        id: 2
      },
      {
        name: 'Komponenttien tila',
        exercises: 14,
        id: 3
      }
    ]
  }

  return (
    <div>
      <Course course={course} />
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)