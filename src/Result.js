import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './Result.css'

function Result({ selectedTypes, PAGE_SIZE, setCurrentPage, currentPage }) {

  const [pokemons, setPokemons] = useState([])
  const [selectedPokemon, setSelectedPokemon] = useState(null)

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
  const numPages = Math.ceil(filteredPokemons.length / PAGE_SIZE);

  const handlePokemonClick = (pokemon) => {
    setSelectedPokemon(pokemon)
  }

  const handleClosePokemon = () => {
    setSelectedPokemon(null)
  }

  const logOut = () => {
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
    window.location.reload();
  }


  return (
    <div>
      {selectedPokemon && (
        <div className="pokemon-modal">
          <div className="pokemon-modal-content">
            <button className="pokemon-modal-close" onClick={handleClosePokemon}>
              X
            </button>
            <div className="pokemon-modal-img">
              <img
                src={`https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/images/${String(selectedPokemon.id).padStart(3, '0')}.png`}
                alt={selectedPokemon.name.english}
              />
            </div>
            <div className="pokemon-modal-stats">
              <h2>{selectedPokemon.name.english}</h2>
              <div className="pokemon-modal-stat">
                <p>Type:</p>
                <p>{selectedPokemon.type.join(', ')}</p>
              </div>
              <div className="pokemon-modal-stat">
                <p>Attack:</p>
                <p>{selectedPokemon.base.Attack}</p>
              </div>
              <div className="pokemon-modal-stat">
                <p>Defense:</p>
                <p>{selectedPokemon.base.Defense}</p>
              </div>
              <div className="pokemon-modal-stat">
                <p>HP:</p>
                <p>{selectedPokemon.base.HP}</p>
              </div>
              <div className="pokemon-modal-stat">
                <p>Sp. Attack:</p>
                <p>{selectedPokemon.base['Sp. Attack']}</p>
              </div>
              <div className="pokemon-modal-stat">
                <p>Sp. Defense:</p>
                <p>{selectedPokemon.base['Sp. Defense']}</p>
              </div>
              <div className="pokemon-modal-stat">
                <p>Speed:</p>
                <p>{selectedPokemon.base.Speed}</p>
              </div>
              <div className="pokemon-modal-stat">
                <p>Total:</p>
                <p>{selectedPokemon.base.Total}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    <div className="pokemon-grid">
      {
        currentPokemons.map(pokemon => (
          <div key={pokemon.id} className="pokemon-card" onClick={() => handlePokemonClick(pokemon)}>
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
          <button onClick={logOut}>Log Out</button>
    </div>
      <Pagination pokemonPerPage={PAGE_SIZE} totalPokemon={filteredPokemons.length} currentPage={currentPage} numPages={numPages} paginate={paginate} />
    </div>


  )
}

function Pagination({ pokemonPerPage, totalPokemon, currentPage, numPages, paginate }) {
  const pageNumbers = []

  for (let i = 1; i <= numPages; i++) {
    pageNumbers.push(i)
  }

  return (
    <div className="pagination-container">
      <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>Prev</button>
      {
        pageNumbers.map(number => (
          <button key={number} onClick={() => paginate(number)} className={currentPage === number ? 'active' : ''}>
            {number}
          </button>
        ))
      }
      <button onClick={() => paginate(currentPage + 1)} disabled={currentPage === numPages}>Next</button>
    </div>
  )
}

export default Result

