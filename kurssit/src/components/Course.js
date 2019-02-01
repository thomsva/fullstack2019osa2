import React from 'react'

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
  <div>
    {props.parts.map(part => <Part key={part.id} part={part} />)}
  </div>
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

export default Course