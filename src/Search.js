import React from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import { useState } from 'react'

function Search({ selectedTypes, setSelectedTypes }) {
  const [types, setTypes] = useState([])

  // called once when component is mounted
  useEffect(() => {
    async function fetchData() {
      const response = await axios.get('https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/types.json')
      setTypes(response.data.map(type => type.english))
    }
    fetchData()
  }, [])


  const handleChange = (e) => {
    const { value, checked } = e.target
    if (checked) {
      setSelectedTypes([...selectedTypes, value])
    } else {
      setSelectedTypes(selectedTypes.filter(type => type !== value))
    }
  }
  
  return (
    <div>
      {
        types.map(type => <div key={type}>
          <input
            type="checkbox"
            value={type}
            id={type}
            onChange={handleChange}
          />
          <label htmlFor={type}>{type}</label>
        </div>)
      }
    </div>
  )
}

export default Search;