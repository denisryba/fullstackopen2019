import React from 'react';
import PersonDetails from './PersonDetails';

const PersonList = ({ persons, deletePerson }) => {
  return (
    <div>
      {persons.map(p => <PersonDetails key={p.name} person={p} deletePerson={deletePerson} />)}
    </div>
  )
};

export default PersonList;