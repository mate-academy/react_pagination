import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export const Pagination = ({ totalItems, perPage, page, onPageChange }) => {
  const maxPageCount = Math.ceil(totalItems / perPage);
  const allPages = Array.from({ length: maxPageCount }, (_, i) => i + 1);

  return (
    <ul className="pagination d-flex justify-content-center mt-5">
      <li
        className={classNames('page-item', {
          disabled: page === 1,
        })}
      >
        <button
          type="button"
          className="page-link"
          onClick={() => onPageChange(page - 1)}
        >
          Previous
        </button>
      </li>

      {allPages.map(singlePage => (
        <li
          className={classNames('page-item', {
            active: singlePage === page,
          })}
          key={singlePage}
        >
          <button
            type="button"
            className="page-link"
            onClick={() => onPageChange(singlePage)}
          >
            {singlePage}
          </button>
        </li>
      ))}

      <li
        className={classNames('page-item', {
          disabled: page === maxPageCount,
        })}
      >
        <button
          type="button"
          className="page-link"
          onClick={() => onPageChange(page + 1)}
        >
          Next
        </button>
      </li>
    </ul>
  );
};

Pagination.propTypes = {
  totalItems: PropTypes.number.isRequired,
  perPage: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};
