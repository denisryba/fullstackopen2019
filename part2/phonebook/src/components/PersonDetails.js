import React from 'react';

const PersonDetails = ({ person, deletePerson }) => {
  return (
    <div>
      {person.name} {person.number} <button onClick={() => deletePerson(person.id)}>x</button>    
    </div>
  );
};

export default PersonDetails;