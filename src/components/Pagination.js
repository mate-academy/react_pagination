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
        <a
          href="#"
          disabled={page < 2}
          onClick={e => onPageChange(e, page - 1)}
          className="page-link"
        >
          «
        </a>
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
              <a
                href="#"
                onClick={e => onPageChange(e, numberPage)}
                className="page-link"
              >
                {numberPage}
              </a>
            </li>
          ) : numberPage === 2 || numberPage === paginationItem - 1 ? (
            <li>...</li>
          ) : null
      ))}

      <li className="page-item">
        <a
          href="#"
          disabled={page > paginationItem - 1}
          onClick={e => onPageChange(e, page + 1)}
          className="page-link"
        >
          »
        </a>
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
