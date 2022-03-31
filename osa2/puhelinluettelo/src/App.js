import { useEffect, useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import axios from 'axios';
import personService from './services/persons';

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searched, setSearched] = useState('');

  useEffect(() => {
    personService
    .getAll()
    .then(res => {
      setPersons(res.data);
    })
  }, []);

  const addPerson = (e) => {
    e.preventDefault();
    if(persons.filter(e => e.name === newName).length > 0){
      window.alert(`${newName} is already added to phonebook`)
    }
    else{
    const personObj = {
      name: newName,
      number: newNumber
    }
    personService
    .create(personObj)
    .then(res => {
      setPersons(persons.concat(res.data));
      setNewName('');
      setNewNumber('');
    })
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
      <Persons persons={persons} searched={searched}/>
    </div>
  )
}
export default App