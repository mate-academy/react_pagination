import React from 'react';
import PropTypes from 'prop-types';
import './Pagination.css';

export const Pagination = ({
  prevPage, nextPage,
  total, withInfo,
  onPageChange, page, perPage,
}) => {
  const list = [];

  const createButton = currentPage => (
    <button
      className={currentPage === +page
        ? 'list-page--active list-page'
        : 'list-page'}
      type="button"
      onClick={() => {
        if (currentPage !== +page) {
          onPageChange(currentPage);
        }
      }}
    >
      {currentPage}
    </button>
  );

  for (let i = 1; i <= Math.ceil(total / perPage); i++) {
    list.push(
      <li
        key={i}
      >
        {createButton(i)}
      </li>
    );
  }

  return (
    <>
      {
      withInfo
      && (
      <h2>
          {`${(page * perPage) - perPage > total
            ? page || total
            : (page * perPage) - perPage} - 
          ${page * perPage > total
            ? total
            : page * perPage}
          of ${total}`}
      </h2>
      )
      }
      <button
        type="button"
        onClick={prevPage}
        className="list-bottom"
        disabled={page === 1}
      >
        prev
      </button>
      <ul className="list-pages">
        {list.map(elem => elem)}
      </ul>
      <button
        type="button"
        onClick={nextPage}
        className="list-bottom"
        disabled={page * perPage > total}
      >
        next
      </button>
    </>
  );
};

Pagination.propTypes = {
  prevPage: PropTypes.func.isRequired,
  nextPage: PropTypes.func.isRequired,
  total: PropTypes.number.isRequired,
  withInfo: PropTypes.bool,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  perPage: PropTypes.number.isRequired,
};

Pagination.defaultProps = {
  withInfo: true,
};
