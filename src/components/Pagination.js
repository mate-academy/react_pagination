import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const Pagination = ({
  currentPage,
  perPage,
  postsAmmount,
  changeCurrentPage,
}) => {
  const lastPage = Math.ceil(postsAmmount / perPage);
  const pages = [];

  for (let i = 1; i < lastPage - 1; i += 1) {
    pages.push(i);
  }

  return (
    <ul className="pagination__buttons">
      <button
        type="button"
        onClick={() => changeCurrentPage(currentPage - 1)}
        className="pagination__button"
        disabled={currentPage === 0 || false}
      >
        ...prev
      </button>

      <button
        type="button"
        onClick={() => changeCurrentPage(0)}
        className={classnames('pagination__button', {
          'pagination-buttons__active': currentPage === 1,
        })}
      >
        1
      </button>

      {pages.map(page => (
        <li key={page}>
          <button
            type="button"
            onClick={() => changeCurrentPage(page)}
            className={classnames('pagination__button', {
              'pagination-buttons__active': currentPage === page,
            })}
          >
            {page + 1}
          </button>
        </li>
      ))}

      <button
        type="button"
        onClick={() => changeCurrentPage(lastPage - 1)}
        className={classnames('pagination__button', {
          'pagination-buttons__active': currentPage === lastPage,
        })}
      >
        {lastPage}
      </button>

      <button
        type="button"
        onClick={() => changeCurrentPage(currentPage + 1)}
        className="pagination__button"
        disabled={currentPage === (lastPage - 1) || false}
      >
        next...
      </button>
    </ul>
  );
};

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  perPage: PropTypes.number.isRequired,
  postsAmmount: PropTypes.number.isRequired,
  changeCurrentPage: PropTypes.func.isRequired,
};

export default Pagination;
