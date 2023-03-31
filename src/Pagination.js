import React from 'react';
import './style.css';

function Pagination({ selectedTypes, PAGE_SIZE, setCurrentPage, currentPage }) {
  const numPages = Math.ceil(selectedTypes.length / PAGE_SIZE);
  const startPage = Math.max(1, Math.min(currentPage - 4, numPages - 9));
  const endPage = Math.min(numPages, startPage + 9);
  const pages = Array.from({ length: endPage - startPage + 1 }, (_, i) => i + startPage);

  return (
    <div>
      {/* Create prev button */}
      <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
        Prev
      </button>
      {/* Create page buttons */}
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => setCurrentPage(page)}
          className={page === currentPage ? 'active' : ''}
        >
          {page}
        </button>
      ))}
      {/* Create next button */}
      <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === numPages}>
        Next
      </button>
    </div>
  );
}

export default Pagination;
