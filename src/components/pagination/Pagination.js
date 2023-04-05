import React from 'react';
import './style.css';

function Pagination({ pokemonPerPage, totalPokemon, currentPage, numPages, paginate, setSearchTerm }) {
  const pageNumbers = []

  for (let i = 1; i <= numPages; i++) {
    pageNumbers.push(i)
  }

  return (
    <div className="pagination-container">
      <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>Prev</button>
      {
        pageNumbers.map(number => (
          <button key={number} onClick={() => {paginate(number); setSearchTerm('')}} className={currentPage === number ? 'active' : ''}>

            {number}
          </button>
        ))
      }
      <button onClick={() => paginate(currentPage + 1)} disabled={currentPage === numPages}>Next</button>
    </div>
  )
}

export default Pagination;
