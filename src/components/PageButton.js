import React from 'react';
import PropTypes from 'prop-types';

const classNames = require('classnames');

export const PageButton = ({ page, isActive, onButtonClick }) => (
  <li
    className={classNames({
      'page-item': true,
      active: isActive,
    })}
  >
    <button
      type="button"
      className="page-link"
      onClick={event => onButtonClick(+event.target.textContent)}
    >
      {page.pageNumber}
    </button>
  </li>
);

PageButton.propTypes = {
  page: PropTypes.shape({
    key: PropTypes.string,
    pageNumber: PropTypes.number,
  }).isRequired,
  isActive: PropTypes.bool.isRequired,
  onButtonClick: PropTypes.func.isRequired,
};
