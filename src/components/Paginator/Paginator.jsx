import React from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames';
import { v4 as uuidv4 } from 'uuid';

import './Paginator.scss';

const handleControlers = (pagesCount, currentBtn) => {
  if (pagesCount <= 4) {
    return [...Array(pagesCount).keys()].map(number => number + 1);
  }

  const prevBtn = currentBtn - 1;
  const nextBtn = currentBtn + 1;

  if ([1, pagesCount].includes(currentBtn)) {
    return currentBtn === 1
      ? [1, 2, '...', pagesCount]
      : [1, '...', pagesCount - 1, pagesCount];
  }

  if (currentBtn === 2 || nextBtn === pagesCount) {
    return currentBtn === 2
      ? [1, currentBtn, nextBtn, '...', pagesCount]
      : [1, '...', prevBtn, currentBtn, pagesCount];
  }

  if (currentBtn - 3 === 0 || currentBtn + 2 === pagesCount) {
    return currentBtn - 3 === 0
      ? [1, 2, currentBtn, nextBtn, '...', pagesCount]
      : [1, '...', prevBtn, currentBtn, pagesCount - 1, pagesCount];
  }

  return [1, '...', prevBtn, currentBtn, nextBtn, '...', pagesCount];
};

export const Paginator = ({ total, perPage, currentPage, handleChange }) => {
  const pagesCount = Math.ceil(total / perPage);

  return (
    <ul className="buttonsContainer">
      <button
        type="button"
        name="currentPage"
        className="button prev"
        value={currentPage - 1}
        disabled={currentPage === 1}
        onClick={handleChange}
      >
        PREV
      </button>
      {
        handleControlers(pagesCount, currentPage, total, perPage).map(page => (
          <li
            key={uuidv4()}
          >
            <button
              type="button"
              name="currentPage"
              className={classNames(
                'button',
                {
                  'button--is-active': page === currentPage,
                },
              )
              }
              value={page}
              onClick={handleChange}
            >
              {page}
            </button>
          </li>
        ))
      }
      <button
        type="button"
        name="currentPage"
        className="button next"
        value={currentPage + 1}
        disabled={currentPage === pagesCount}
        onClick={handleChange}
      >
        NEXT
      </button>
    </ul>
  );
};

Paginator.propTypes = {
  total: PropTypes.number.isRequired,
  perPage: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  handleChange: PropTypes.func.isRequired,
};
