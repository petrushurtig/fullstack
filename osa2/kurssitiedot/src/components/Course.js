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
        </div>
    )
}
const Header = (props) => <h1>{props.course.name}</h1>
const Content = ({course}) => {
    return (
    <div>
        
            {course.parts.map(part => 
                <p key={part.id}>
                    {part.name} {part.exercises}
                </p>)}
        
    </div>
    )
}
export default Course;