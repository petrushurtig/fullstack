const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  const Header = (props) => {
    return(
      <>
        <h1>{props.course}</h1>
      </>
    )
  }
  const Content = (props) => {
    return(
      <>
      <Part part={part1.name} exercise={part1.exercises}/>
      <Part part={part2.name} exercise={part2.exercises}/>
      <Part part={part3.name} exercise={part3.exercises}/>
      </>
    )
  }
  const Part = (props) => {
    return(
      <>
        <p>{props.part} {props.exercise}</p>
      </>
    )
  }
  const Total = (props) => {
    return(
      <>
      <p>Number of exercises {props.exercises1 + props.exercises2 + props.exercises3}</p>
      </>
    )
  }

  return (
    <div>
      <Header course={course} />
      <Content />
      <Total exercises1={part1.exercises} exercises2={part2.exercises} exercises3={part3.exercises}/>
    </div>
  )
}

export default App