import { useEffect, useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons';

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searched, setSearched] = useState('');

  useEffect(() => {
    personService
    .getAll()
    .then(data => {
      setPersons(data);
    })
  }, []);

  const addPerson = (e) => {
    e.preventDefault();
    if(persons.filter(e => e.name === newName).length > 0){
      const person = persons.find(p => p.name === newName)
      const changedPerson = {...person, number: newNumber}
      if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
        personService
        .update(changedPerson.id, changedPerson)
        .then(returnedPerson => {
          setPersons(persons.map(person => person.id !== returnedPerson.id ? person : returnedPerson))
        })
        .catch(error => {
          alert(
            `person '${person.name}' was already deleted from server`
          )
          setPersons(persons.filter(p => p.id !== person.id))
        })
      }
    }
    else{
    const personObj = {
      name: newName,
      number: newNumber
    }
    personService
    .create(personObj)
    .then(res => {
      setPersons(persons.concat(res));
      setNewName('');
      setNewNumber('');
    })
     }
  }
  const deletePerson = (person) => {
    const message = `Delete ${person.name}?`;
    if(window.confirm(message)){
      personService
      .remove(person.id)
      .then(res => {
        setPersons(persons.filter(p => p.id !== person.id))
      })
      .catch((error) => console.log(error))
    }
  }
  const handleNameChange = (e) => {
    setNewName(e.target.value);
  }
  const handleNumberChange = (e) => {
    setNewNumber(e.target.value);
  }
  const handleSearch = (e) => {
    setSearched(e.target.value);
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter searched={searched} handleSearch={handleSearch}/>
      <h2>add a new</h2>
      <PersonForm addPerson={addPerson} newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange}/>
      <h2>Numbers</h2>
      <Persons persons={persons} deletePerson={deletePerson} searched={searched}/>
    </div>
  )
}
export default App