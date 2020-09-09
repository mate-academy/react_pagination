import React from 'react';
import PropTypes from 'prop-types';
import words from '../../list/list.json';

import './Pagination.css';

export const Pagination = ({ start, step, toNext, toPrev, toPage }) => {
  const buttons = [...Array(Math.ceil(words.length / step))]
    .map((item, i) => i + 1);

  const buttonStyle = (button) => {
    const page = (button - 1) * step;
    let className = '';

    if (page === start) {
      className = 'pagination__button--active ';
    }

    if (page === start
         || page === (start + step)
         || page === (start - step)
         || button === 1
         || button === buttons.length) {
      className += 'pagination__button';
    } else {
      className = 'pagination__button--none';
    }

    return className;
  };

  return (
    <div>
      <div
        className="pagination__buttons"
      >
        <button
          type="button"
          onClick={toPrev}
          className="pagination__button"
          disabled={start === 0 && true}
        >
          Prev
        </button>
        {buttons.map((button, i) => (
          <button
            className={buttonStyle(button)}
            key={button}
            type="button"
            value={button}
            onClick={toPage}
          >
            {button}
          </button>
        ))}

        <button
          className="pagination__button"
          type="button"
          onClick={toNext}
          disabled={start >= words.length - step && true}
        >
          Next
        </button>
      </div>
    </div>
  );
};

Pagination.propTypes = {
  start: PropTypes.number.isRequired,
  step: PropTypes.number.isRequired,
  toNext: PropTypes.func.isRequired,
  toPage: PropTypes.func.isRequired,
  toPrev: PropTypes.func.isRequired,
};
