import React, { useState, useEffect } from 'react';
import SearchFilter from './components/SearchFilter';
import NewPersonForm from './components/NewPersonForm.js';
import Notification from './components/Notification.js';
import PersonList from './components/PersonList';
import personService from './services/persons.js';
import './App.css';

const App = () => {
  const [ persons, setPersons ] = useState([]);
  const [ newName, setNewName ] = useState('');
  const [ newNumber, setNewNumber ] = useState('');
  const [ filter, setFilter ] = useState('');
  const [ notification, setNotification ] = useState({ message: null});

  useEffect(() => {
    personService
      .getAll()
      .then(persons =>
        setPersons(persons)
      )
  }, []);

  const handleNameChange = (event) =>
    setNewName(event.target.value);

  const handleNumberChange = (event) =>
    setNewNumber(event.target.value);

  const handleFilterChange = (event) =>
    setFilter(event.target.value);

  const personsToShow = () => {
    if (filter)
      return persons.filter(p => p.name.toLowerCase().includes(filter.toLowerCase()));

    return persons;
  };

  const notify = (message, type) => {
    setNotification({message, type});
    setTimeout(() => setNotification({message: null}), 5000);
  };

  const addPerson = (event) => {
    event.preventDefault();
    const existingPerson = persons.find(p => p.name.toLowerCase() === newName.toLowerCase());
    if (!existingPerson) {
      const newPerson = {
        name: newName,
        number: newNumber
      };
      personService
        .createPerson(newPerson)
        .then(addedPerson => {
          setPersons(persons.concat(addedPerson));
          setNewName('');
          setNewNumber('');
          notify(`${addedPerson.name} was added to phonebook`, 'ok');
        });      
    } else {
      const replace = window.confirm(`${newName} already exists in phonebook. Replace number with a new one?`);
      if (replace) {
        personService
          .updatePerson({...existingPerson, number: newNumber})
          .then((updatedPerson) => {
            setPersons(persons.map(p => p.id === updatedPerson.id ? updatedPerson : p))
            setNewName('');
            setNewNumber('');
            setNotification(`${newName}'s number was updated`);
            setTimeout(() => setNotification(null), 5000);
          })
          .catch(() => {
            notify(`${newName} has already been removed from the server`, 'error');
            setPersons(persons.filter(p => p.name !== newName));
          })
      }
    }   
  };

  const deletePerson = (id) => {
    const person = persons.find(p => p.id === id);
    const confirmed = window.confirm(`Are you shure you want to delete ${person.name}?`);
    if (confirmed) {
      personService
        .deletePerson(id)
        .then(() => {
          setPersons(persons.filter(p => p.id !== id));
        }  
      );
    }
  };

  return (
    <div className='container'>
      <h2>Phonebook</h2>
      <SearchFilter filter={filter} handleFilterChange={handleFilterChange} />
      <Notification notification={notification} />
      <h3>add a new</h3>
      <NewPersonForm
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        addPerson={addPerson}
      />
      <h3>Numbers</h3>
      <PersonList persons={personsToShow()} deletePerson={deletePerson} />
    </div>
  );
};

export default App;
