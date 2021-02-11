import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

// eslint-disable-next-line max-len
export const Pagination = ({ total, perPage, page, onPageChange, array, onNextClick, onPrevClick }) => (
  <>
    <li className={classNames('page-item', { disabled:
         page - perPage <= 0 })}
    >
      <a
        className="page-link"
        href="./"
        tabIndex="-1"
        aria-disabled={page - perPage <= 0}
        onClick={(event) => {
          event.preventDefault();
          onPrevClick();
        }}
        aria-label="Previous"
      >
        <span aria-hidden="true">&laquo;</span>

      </a>
    </li>
    {array.map(item => (
      <li
        key={item}
        className={classNames('page-item', { active: item === page })}
      >
        <a
          className="page-link"
          href="./"
          onClick={(event) => {
            event.preventDefault();
            onPageChange(item);
          }}
        >
          {item}
        </a>
      </li>
    ))}
    <li className={classNames('page-item', { disabled:
         page + perPage >= total })}
    >
      <a
        className="page-link"
        href="./"
        aria-disabled={page + perPage >= total}
        onClick={(event) => {
          event.preventDefault();
          onNextClick();
        }}
        aria-label="Next"
      >
        <span aria-hidden="true">&raquo;</span>
      </a>
    </li>
  </>
);
Pagination.defaultProps = {
  perPage: 5,
  page: 1,
};
Pagination.propTypes = {
  total: PropTypes.number.isRequired,
  perPage: PropTypes.number,
  page: PropTypes.number,
  onPageChange: PropTypes.func.isRequired,
  onNextClick: PropTypes.func.isRequired,
  onPrevClick: PropTypes.func.isRequired,
  array: PropTypes.arrayOf(PropTypes.number).isRequired,
};
