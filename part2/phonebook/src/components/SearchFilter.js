import React from 'react';

const SearchFilter = ({ filter, handleFilterChange }) => {
  return (
    <div>
      find <input value={filter} onChange={handleFilterChange} />
    </div> 
  );
};

export default SearchFilter;