const Persons = ({ persons, searched }) => {
    return (
        <div>
            {persons.filter(person => person.name.match(new RegExp(searched, "i")))
        .map(person => 
          <p key={person.name}>{person.name} {person.number}</p>
      )}
        </div>
    )
}
export default Persons;