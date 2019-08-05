import React from 'react';
import PropTypes from 'prop-types';
import './App.css';

const classNames = require('classnames');

const Pagination = ({
  total,
  perPage,
  activePage,
  onPageChange,
  handlePerPage,
}) => {
  const countPages = Math.ceil(total / perPage);
  const paginationList = Array.from(Array(countPages), (elem, i) => i + 1);
  const firstPostOnPage = activePage * perPage + 1;
  const lastPostOnPage = (activePage === countPages - 1)
    ? total
    : (activePage + 1) * perPage;

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
          className={classNames({
            pagination__item: true,
            'pagination__item--prev': true,
            'pagination__item--disabled': activePage === 0,
          })}
          onClick={() => onPageChange(activePage - 1)}
        >
          Prev
        </li>

        {paginationList.map((paginationItem, i) => (
          // eslint-disable-next-line max-len
          // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions
          <li
            key={paginationItem}
            className={classNames({
              pagination__item: true,
              'pagination__item--active': activePage === i,
            })}
            onClick={() => onPageChange(i)}
          >
            {paginationItem}
          </li>
        ))}
        {/* eslint-disable-next-line max-len */}
        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions */}
        <li
          className={classNames({
            pagination__item: true,
            'pagination__item--next': true,
            'pagination__item--disabled':
              activePage === paginationList.length - 1,
          })}
          onClick={() => onPageChange(activePage + 1)}
        >
          Next
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
