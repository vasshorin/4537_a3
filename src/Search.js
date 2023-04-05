import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Search.css';

function Search({ selectedTypes, setSelectedTypes, setSearchTerm }) {
  const [types, setTypes] = useState([]);

  // called once when component is mounted
  useEffect(() => {
    async function fetchData() {
      const response = await axios.get('https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/types.json');
      setTypes(response.data.map((type) => type.english));
    }
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedTypes([...selectedTypes, value]);
    } else {
      setSelectedTypes(selectedTypes.filter((type) => type !== value));
    }
  };
  const logOut = () => {
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
    window.location.reload();
  }


  return (
    <div className="container">
            <button onClick={logOut}>Log Out</button>
      <h1>Pokemon Search</h1>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search by name"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="type-list">
        {types.map((type) => (
          <div key={type}>
            <input type="checkbox" value={type} id={type} onChange={handleChange} />
            <label htmlFor={type}>{type}</label>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Search;
