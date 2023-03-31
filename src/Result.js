import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './Result.css'

function Result({ selectedTypes, PAGE_SIZE, setCurrentPage, currentPage }) {

  const [pokemons, setPokemons] = useState([])

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get('https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/pokedex.json')
      setPokemons(response.data)
    }
    fetchData()
  }, [])

  const filteredPokemons = pokemons.filter(pokemon => selectedTypes.length === 0 || selectedTypes.every(type => pokemon.type.includes(type)))

  const indexOfLastPokemon = currentPage * PAGE_SIZE
  const indexOfFirstPokemon = indexOfLastPokemon - PAGE_SIZE
  const currentPokemons = filteredPokemons.slice(indexOfFirstPokemon, indexOfLastPokemon)

  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  return (
    <div className="pokemon-grid">
      {
        currentPokemons.map(pokemon => (
          <div key={pokemon.id} className="pokemon-card">
            <img
              src={`https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/images/${String(pokemon.id).padStart(
                3,
                '0'
              )}.png`}
              alt={pokemon.name.english}
            />
            <h1>{pokemon.name.english}</h1>
            <p>{pokemon.type.join(', ')}</p>
          </div>
        ))
      }
      <Pagination pokemonPerPage={PAGE_SIZE} totalPokemon={filteredPokemons.length} paginate={paginate} />
    </div>
  )
}

function Pagination({ pokemonPerPage, totalPokemon, paginate }) {
  const pageNumbers = []

  for (let i = 1; i <= Math.ceil(totalPokemon / pokemonPerPage); i++) {
    pageNumbers.push(i)
  }

  return (
    <div className="pagination-container">
      {
        pageNumbers.map(number => (
          <button key={number} onClick={() => paginate(number)}>
            {number}
          </button>
        ))
      }
    </div>
  )
}

export default Result



// import React from 'react'
// import axios from 'axios'
// import { useEffect } from 'react'
// import { useState } from 'react'

// function Result({ selectedTypes, PAGE_SIZE, setCurrentPage, currentPage  }) {
//     const numPages = Math.ceil(selectedTypes.length / PAGE_SIZE);
//   const startPage = Math.max(1, Math.min(currentPage - 4, numPages - 9));
//   const endPage = Math.min(numPages, startPage + 9);
//   const pages = Array.from({ length: endPage - startPage + 1 }, (_, i) => i + startPage);

//   const [pokemons, setPokemons] = useState([])

//   useEffect(() => {
//     async function fetchData() {
//       const response = await axios.get('https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/pokedex.json')
//       setPokemons(response.data)
//     }
//     fetchData()
//   }, [])

//   return (
//     <div className='pokemon-grid'>
//       {
//         pokemons.map(pokemon => {
//           if (selectedTypes.length === 0) {
//             return (
//               <>
//               </>
//             )
//           } else
//             if (selectedTypes.every(type => pokemon.type.includes(type))) {
//               return (
//                 <>
//                     <div key={pokemon.id} className="pokemon-card">
//                         <img src={`https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/images/${String(pokemon.id).padStart(
//               3,
//               '0'
//             )}.png`} alt={pokemon.name.english} />
//                         <h3>{pokemon.name.english}</h3>
//                         <p>{pokemon.type.join(', ')}</p>
//                     </div>

//                 </>
//               )
//             }
//         })
//       }
//     </div>
//   )

  
// }

// export default Result