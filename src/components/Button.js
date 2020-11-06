import React from 'react';
import PropTypes from 'prop-types';

const classNames = require('classnames');

export const Button = ({ onClick, disableIf, text }) => (
  <li
    className={classNames({
      'page-item': true,
      disabled: disableIf,
    })}
  >
    <button
      type="button"
      className="page-link"
      onClick={onClick}
    >
      {text}
    </button>
  </li>
);

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  disableIf: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired,
};
