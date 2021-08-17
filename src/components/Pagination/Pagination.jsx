import React from 'react';
import './Pagination.css';
import PropTypes from 'prop-types';

import { Page } from '../Page';

export const Pagination = ({
  total,
  perPage,
  page,
  changePerPage,
  onPageChanged,
}) => {
  const totalList = Array.from({ length: total }, (_, i) => i + 1);
  const numberOfPages = Math.ceil(total / perPage);
  const pagesList = Array.from({ length: numberOfPages }, (_, i) => i + 1);

  return (
    <div className="pagination">
      <form>
        <select
          className="form-select form-select-sm"
          name="perPage"
          value={perPage}
          onChange={changePerPage}
        >
          {totalList.map(number => (
            <option key={number} value={number}>{number}</option>
          ))}
        </select>
      </form>
      <Page
        total={total}
        perPage={perPage}
        page={page}
      />
      <nav aria-label="Page navigation example">
        <div className="buttons">
          <button
            className="page-item page-link"
            type="button"
          >
            previous
          </button>
          {pagesList.map(item => (
            <button
              className="page-item page-link"
              type="button"
              key={item}
              value={item}
              onClick={onPageChanged}
            >
              {item}
            </button>
          ))}

          <button
            className="page-item page-link"
            type="button"
          >
            next
          </button>
        </div>
      </nav>
    </div>
  );
};

Pagination.propTypes = {
  total: PropTypes.number.isRequired,
  perPage: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  changePerPage: PropTypes.func.isRequired,
  onPageChanged: PropTypes.func.isRequired,
};
