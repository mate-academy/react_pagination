import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'class-names';

export const PrevPage = ({ selectedPage, prevPageHandler }) => (
  <li
    className="page-item"
    onClick={prevPageHandler}
  >
    <a
      className={classNames(
        'page-link',
        { 'text-danger disable': selectedPage === 1 },
      )}
      href={`#${selectedPage}`}
    >
      Previous
    </a>
  </li>
);

PrevPage.propTypes = {
  selectedPage: PropTypes.number.isRequired,
  prevPageHandler: PropTypes.func.isRequired,
}.isRequired;
