import React from 'react';
import PropTypes from 'prop-types';

export const Pagination = ({ total, perPage, page, onPageChange }) => {
  const paginationItem = Math.ceil(total / perPage);
  const paginationList = [];

  for (let i = 1; i <= paginationItem; i++) {
    paginationList.push(i);
  }

  return (
    <ul className="pagination">
      <li className="page-item">
        <button
          type="button"
          disabled={page < 2}
          onClick={() => onPageChange(page - 1)}
          className="page-link"
        >
          «
        </button>
      </li>
      {paginationList.map(numberPage => (
        numberPage === 1
        || numberPage === paginationItem
        || numberPage === page
        || numberPage === page - 1
        || numberPage === page + 1
          ? (
            <li
              key={numberPage + Math.random()}
              className={numberPage === page ? 'page-item active' : 'page-item'}
            >
              <button
                type="button"
                onClick={() => onPageChange(numberPage)}
                className="page-link"
              >
                {numberPage}
              </button>
            </li>
          ) : numberPage === 2 || numberPage === paginationItem - 1 ? (
            <li key={numberPage + Math.random()}>...</li>
          ) : null
      ))}

      <li className="page-item">
        <button
          type="button"
          href="#"
          disabled={page > paginationItem - 1}
          onClick={() => onPageChange(page + 1)}
          className="page-link"
        >
          »
        </button>
      </li>

    </ul>
  );
};

Pagination.propTypes = {
  total: PropTypes.number.isRequired,
  perPage: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};
