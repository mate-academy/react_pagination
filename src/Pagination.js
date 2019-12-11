import React from 'react';
import PropTypes from 'prop-types';

const Pagination = ({ total, perPage, selectedPage, handlePageChange }) => {
  const pageNumber = Math.ceil(total / perPage);
  const firstItemShown = perPage * selectedPage - (perPage - 1);
  const lastItemShown = perPage * selectedPage > total
    ? total
    : perPage * selectedPage;

  return (
    <>
      <p>{`(${firstItemShown} to ${lastItemShown} of ${total})`}</p>
      <ul className="pagination">
        <button
          type="button"
          className="button button_switch button_prev"
          disabled={selectedPage === 1}
          onClick={() => handlePageChange(selectedPage - 1)}
        >
          Previous
        </button>
        {[...Array(pageNumber).keys()].map(page => (
          <li key={page}>
            <button
              type="button"
              onClick={() => handlePageChange(page + 1)}
              className={
                page === selectedPage - 1
                  ? 'button button_active'
                  : 'button'}
            >
              {page + 1}
            </button>
          </li>
        ))}
        <button
          type="button"
          className="button button_switch"
          onClick={() => handlePageChange(selectedPage + 1)}
          disabled={selectedPage === pageNumber}
        >
          Next
        </button>
      </ul>
    </>
  );
};

Pagination.propTypes = {
  selectedPage: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  perPage: PropTypes.number.isRequired,
  handlePageChange: PropTypes.func.isRequired,
};

export default Pagination;
