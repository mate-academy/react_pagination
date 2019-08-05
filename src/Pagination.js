import React from 'react';
import PropTypes from 'prop-types';
import './App.css';

const Pagination = ({
  total,
  perPage,
  activePage,
  firstPostOnPage,
  lastPostOnPage,
  onPageChange,
  handlePerPage,
}) => {
  const countPages = Math.ceil(total / perPage);
  const paginationList = Array.from(Array(countPages), (elem, i) => i + 1);

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
        {/* eslint-disable-next-line max-len */}
        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions */}
        <li
          className={activePage === 0
            ? 'pagination__item pagination__item--prev '
            + 'pagination__item--disabled'
            : 'pagination__item pagination__item--prev'}
          onClick={() => onPageChange(activePage - 1)}
        >
          Prev
        </li>

        {paginationList.map((paginationItem, i) => (
          // eslint-disable-next-line max-len
          // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions
          <li
            key={paginationItem}
            className={activePage === i
              ? 'pagination__item pagination__item--active'
              : 'pagination__item'
            }
            onClick={() => onPageChange(i)}
          >
            {paginationItem}
          </li>
        ))}
        {/* eslint-disable-next-line max-len */}
        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions */}
        <li
          className={activePage === paginationList.length - 1
            ? 'pagination__item pagination__item--next '
            + 'pagination__item--disabled'
            : 'pagination__item pagination__item--next'}
          onClick={() => onPageChange(activePage + 1)}
        >
          Next
        </li>
      </ul>
      <div className="pagination__info">
        {firstPostOnPage}
        -
        {lastPostOnPage}
        of
        {total}
      </div>
    </div>
  );
};

Pagination.propTypes = {
  total: PropTypes.number.isRequired,
  perPage: PropTypes.number.isRequired,
  activePage: PropTypes.number.isRequired,
  firstPostOnPage: PropTypes.number.isRequired,
  lastPostOnPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  handlePerPage: PropTypes.func.isRequired,
};

export default Pagination;
