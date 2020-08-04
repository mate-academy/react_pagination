import React from 'react';
import './Pagination.css';
import PropTypes, { number } from 'prop-types';

export const Pagination = (
  { length,
    perPage,
    onPageChange,
    handleNext,
    handlePrevious,
    currentPage,
    withInfo,
    onPerPage },
) => {
  const pages = [];
  const numberOfPages = Math.ceil(length / perPage);

  for (let i = 1; i <= numberOfPages; i += 1) {
    pages.push(i);
  }

  return (
    <nav aria-label="Page navigation example">
      <div className="input-group">
        <select
          value={perPage}
          onChange={onPerPage}
          className="select"
          id="inputGroupSelect04"
          aria-label="Example select with button addon"
        >
          <option value="3">3</option>
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
        </select>
      </div>
      <h2>{withInfo()}</h2>
      <ul className="pagination">
        <li
          className={(currentPage === 1) ? 'page-item disabled' : 'page-item'}
        >
          <button
            type="button"
            className="page-link"
            onClick={handlePrevious}
          >
            Previous
          </button>
        </li>

        {pages.map(page => (
          <li
            className={
              (page === currentPage) ? 'page-item active' : 'page-item'
            }
            key={page}
          >
            <button
              type="button"
              className="page-link"
              onClick={() => onPageChange(page)}
            >
              {page}
            </button>
          </li>
        ))}
        <li
          className={
            (currentPage === numberOfPages) ? 'page-item disabled' : 'page-item'
          }
        >
          <button
            type="button"
            className="page-link"
            onClick={handleNext}
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
};

Pagination.propTypes = {
  length: number.isRequired,
  perPage: number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  handleNext: PropTypes.func.isRequired,
  handlePrevious: PropTypes.func.isRequired,
  currentPage: number.isRequired,
  withInfo: PropTypes.func.isRequired,
  onPerPage: PropTypes.func.isRequired,
};
