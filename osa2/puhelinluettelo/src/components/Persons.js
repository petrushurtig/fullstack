const Persons = ({ persons, searched, deletePerson }) => {
    return (
        <div>
            {persons.filter(person => person.name.match(new RegExp(searched, "i")))
        .map(person => 
          <p key={person.id}>{person.name} {person.number} <button onClick={() => deletePerson(person)}>delete</button></p>
      )}
        </div>
    )
}
export default Persons;