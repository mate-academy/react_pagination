import React from 'react';
import classnames from 'classnames';

import PropTypes from 'prop-types';

const Pagination = ({ pageNumbers, handleClickPagination, page }) => (
  <nav aria-label="...">
    <ul className="pagination justify-content-center">
      <li
        className={classnames({
          'page-item': true,
          disabled: page === 1,
        })}
        onClick={() => handleClickPagination('previous')}
      >
        <span className="page-link">Previous</span>
      </li>
      {pageNumbers.map(number =>
        <li
          className={classnames({
            'page-item': true,
            active: number === page,
          })}
          onClick={() => handleClickPagination(number)}
        >
          <a
            className="page-link"
          >
            {number}
          </a>
        </li>)
      }
      <li
        className={classnames({
          'page-item': true,
          disabled: page === pageNumbers.length,
        })}
        onClick={() => handleClickPagination('next')}
      >
        <a className="page-link" href="#">Next</a>
      </li>
    </ul>
  </nav>
);

Pagination.propTypes = {
  pageNumbers: PropTypes.number.isRequired,
  handleClickPagination: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
};

export default Pagination;
