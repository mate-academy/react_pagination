import React from 'react';
import classnames from 'classnames';

import PropTypes from 'prop-types';

const Pagination = ({ handleClickPagination, page, onPerPageChange, peoples, perPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(peoples.length / perPage); i += 1) {
    pageNumbers.push(i);
  }

  return (
    <>
      <select
        onChange={(event) => onPerPageChange(event.target.value)}
        className="form-control"
        id="formControlSelect"
      >
        <option value="3">3</option>
        <option value="5" selected>5</option>
        <option value="10">10</option>
        <option value="20">20</option>
      </select>
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
            onClick={() => handleClickPagination('next', pageNumbers)}
          >
            <a className="page-link" href="#">Next</a>
          </li>
        </ul>
      </nav>
    </>
  )
}

Pagination.propTypes = {
  pageNumbers: PropTypes.number.isRequired,
  handleClickPagination: PropTypes.func.isRequired,
  onPerPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
};

export default Pagination;
