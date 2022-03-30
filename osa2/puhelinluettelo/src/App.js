import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const addPerson = (e) => {
    e.preventDefault();
    console.log(newName);
    console.log(persons)
    if(persons.filter(e => e.name === newName).length > 0){
      window.alert(`${newName} is already added to phonebook`)
    }
    else{
    const personObj = {
      name: newName
    }
    setPersons(persons.concat(personObj))
    setNewName('');
    }
  }

  const handleInputChange = (e) => {
    setNewName(e.target.value);
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleInputChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person) => 
        <p key={person.name}>{person.name}</p>)}
    </div>
  )

}

export default App