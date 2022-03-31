import { useEffect, useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import axios from 'axios';

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searched, setSearched] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3001/persons')
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
    setPersons(persons.concat(personObj))
    setNewName('');
    setNewNumber('');
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