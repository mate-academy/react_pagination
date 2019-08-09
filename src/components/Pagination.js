import React from 'react';
import PropTypes from 'prop-types';
import '../App.css';

const classNames = require('classnames');

const Pagination = ({
  total,
  perPage,
  activePage,
  onPageChange,
  handlePerPage,
}) => {
  const countPages = Math.ceil(total / perPage);
  const firstPostOnPage = activePage * perPage + 1;
  const lastPostOnPage = (activePage === countPages - 1)
    ? total
    : (activePage + 1) * perPage;

  const setPaginationList = (page, count) => {
    if (count < 5) {
      return Array(Math.ceil(total / perPage))
        .fill(1)
        .map((item, i) => i + 1);
    }

    if (page === 1) {
      return [1, 2, '...', count];
    }

    if (page === 2) {
      return [1, 2, 3, '...', count];
    }

    if (page === 3) {
      return [1, 2, 3, 4, '...', count];
    }

    if (page >= 4 && page < count - 2) {
      return [1, '...', page - 1, page, page + 1, '...', count];
    }

    return [1, '...', count - 3, count - 2, count - 1, count];
  };

  const paginationList = setPaginationList(activePage, countPages);

  return (
    <div className="pagination">
      <select
        className="pagination__select-per-page"
        onChange={handlePerPage}
        value={perPage}
      >
        <option value="3">3</option>
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="20">20</option>
      </select>
      <ul className="pagination__list">
        <li>
          <button
            type="button"
            className={classNames({
              pagination__item: true,
              'pagination__item--prev': true,
              'pagination__item--disabled': activePage === 1,
            })}
            onClick={() => onPageChange(activePage - 1)}
          >
            Prev
          </button>
        </li>

        {paginationList.map((paginationItem, i) => (
          <li key={Math.random()}>
            <button
              type="button"
              className={classNames({
                pagination__item: true,
                'pagination__item--active': activePage === paginationItem,
                'pagination__item--disabled': paginationItem === '...',
              })}
              onClick={() => onPageChange(paginationItem)}
            >
              {paginationItem}
            </button>
          </li>
        ))}
        <li>
          <button
            type="button"
            className={classNames({
              pagination__item: true,
              'pagination__item--next': true,
              'pagination__item--disabled':
                activePage === countPages,
            })}
            onClick={() => onPageChange(activePage + 1)}
          >
            Next
          </button>
        </li>
      </ul>
      <div className="pagination__info">
        {firstPostOnPage}
        &nbsp;-&nbsp;
        {lastPostOnPage}
        &nbsp;of&nbsp;
        {total}
      </div>
    </div>
  );
};

Pagination.propTypes = {
  total: PropTypes.number.isRequired,
  perPage: PropTypes.number.isRequired,
  activePage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  handlePerPage: PropTypes.func.isRequired,
};

export default Pagination;
