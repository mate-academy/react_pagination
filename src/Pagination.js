import React from 'react';
import PropTypes from 'prop-types';

export const Pagination = ({
  total, perPage, currentPage, onPerPageChange, onPageChange,
}) => {
  const firstPage = 1;
  const lastPage = Math.ceil(total / perPage);
  const selectOptions = [3, 5, 10, 20];

  return (
    <>
      <nav className="pagination justify-content-center">
        <button
          type="button"
          className={currentPage === 1
            ? 'page-item disabled'
            : 'page-item page-link'}
          disabled={currentPage === 1}
          value={currentPage}
          onClick={event => onPageChange(+event.target.value - 1)}
        >
          Prev
        </button>
        <button
          type="button"
          className="page-item page-link"
          hidden={currentPage - 2 <= 0}
          value={firstPage}
          onClick={event => onPageChange(+event.target.value)}
        >
          {firstPage}
        </button>
        <button
          type="button"
          className="page-item page-link"
          hidden={firstPage + 1 >= currentPage - 1}
        >
          ...
        </button>
        <button
          type="button"
          className="page-item page-link"
          hidden={currentPage - 1 <= 0}
          value={currentPage - 1}
          onClick={event => onPageChange(+event.target.value)}
        >
          {currentPage - 1}
        </button>
        <button
          type="button"
          className="btn btn-primary"
          value={currentPage}
          onClick={event => onPageChange(+event.target.value)}
        >
          {currentPage}
        </button>
        <button
          type="button"
          className="page-item page-link"
          hidden={currentPage + 1 > lastPage}
          value={currentPage + 1}
          onClick={event => onPageChange(+event.target.value)}
        >
          {currentPage + 1}
        </button>
        <button
          type="button"
          className="page-item page-link"
          hidden={lastPage - 1 <= currentPage + 1}
        >
          ...
        </button>
        <button
          type="button"
          className="page-item page-link"
          hidden={currentPage + 2 > lastPage}
          value={lastPage}
          onClick={event => onPageChange(+event.target.value)}
        >
          {lastPage}
        </button>
        <button
          type="button"
          className={currentPage === lastPage
            ? 'page-item disabled'
            : 'page-item page-link'}
          disabled={currentPage === lastPage}
          value={currentPage}
          onClick={event => onPageChange((+event.target.value + 1))}
        >
          Next
        </button>
      </nav>
      <form>
        <select
          className="form-control"
          defaultValue={perPage}
          onChange={event => onPerPageChange(event)}
        >
          {selectOptions.map(option => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </form>
    </>
  );
};

Pagination.propTypes = {
  total: PropTypes.number.isRequired,
  perPage: PropTypes.number,
  currentPage: PropTypes.number,
  onPerPageChange: PropTypes.func.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

Pagination.defaultProps = {
  perPage: 5,
  currentPage: 1,
};
