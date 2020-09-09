import React from 'react';
import PropTypes from 'prop-types';
import words from '../../list/list.json';

import './List.css';

export const List = ({ start, step }) => (
  <div
    className="pagination__list"
  >
    {words.slice(start, start + step)
      .map((word, i) => (
        <p
          className="pagination__item"
          key={word}
        >
          <span
            className="pagination__number"
          >
            {start + i + 1}
          </span>
          <span
            className="pagination__word"
          >
            {word}
          </span>
        </p>
      ))}
  </div>
);

List.propTypes = {
  start: PropTypes.number.isRequired,
  step: PropTypes.number.isRequired,
};
