const Course = () => {
    const course = {
        name: 'Half Stack application development',
        id: 1,
        parts: [
          {
            name: 'Fundamentals of React',
            exercises: 10,
            id: 1
          },
          {
            name: 'Using props to pass data',
            exercises: 7,
            id: 2
          },
          {
            name: 'State of a component',
            exercises: 14,
            id: 3
          }
        ]
      }
    return(
        <div>
            <Header course={course}/>
            <Content course={course}/>
            <Total parts={course.parts} />
        </div>
    )
}
const Header = (props) => <h1>{props.course.name}</h1>
const Content = ({course}) => {
    return (
    <div>
            {course.parts.map(part => 
            <Part key={part.id} part={part} />
            )}
    </div>
    )
}
const Part = ({ part }) => {
    return (
        <p>{part.name} {part.exercises}</p>
    )
}

const Total = ({ parts }) => {
    const total = 0;
    const exercises = [];
    parts.map(part => exercises.push(part.exercises))
    const sum = exercises.reduce((p,c) => p + c, total);
   return <p><b>total of {sum} exercises</b></p>
}
export default Course;