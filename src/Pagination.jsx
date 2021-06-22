import React from 'react';
import './App.css';
import PropTypes from 'prop-types';

function Pagination(props) {
  const {
    total,
    perPage,
    page,
    nextPage,
    currentPage,
    prevPage,
    onPageChange,
    btnNextDisabled,
    btnPrevDisabled,
  } = props;
  const items = [];

  for (let i = page; i <= perPage; i += 1) {
    if (currentPage === i) {
      items.push(
        <li className="page-item">
          <button
            className="current-page"
            type="button"
            onClick={() => onPageChange(i)}
          >
            {i}
          </button>
        </li>,
      );
    } else {
      items.push(
        <li className="page-item">
          <button type="button" onClick={() => onPageChange(i)}>
            {i}
          </button>
        </li>,
      );
    }
  }

  return (
    <>
      <span>
        {page}
        {' '}
        -
        {perPage}
        {' '}
        of
        {total}
        {' '}
      </span>
      <ul className="pagination">
        <li>
          <button
            type="button"
            onClick={() => prevPage()}
            disabled={btnPrevDisabled}
          >
            Previous
          </button>
        </li>
        {items}
        <li>
          <button
            type="button"
            onClick={() => nextPage()}
            disabled={btnNextDisabled}
          >
            Next
          </button>
        </li>
      </ul>
    </>
  );
}

Pagination.propTypes = {
  total: PropTypes.number.isRequired,
  perPage: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  nextPage: PropTypes.func.isRequired,
  prevPage: PropTypes.func.isRequired,
  btnNextDisabled: PropTypes.bool.isRequired,
  btnPrevDisabled: PropTypes.bool.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Pagination;
