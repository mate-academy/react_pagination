import React from 'react';
import PropTypes from 'prop-types';

const PageButton = ({ onSwitch, children }) => (
  <button
    className="paginator__button"
    type="button"
    key={children}
    onClick={onSwitch}
  >
    {children}
  </button>
);

PageButton.propTypes = {
  onSwitch: PropTypes.func.isRequired,
  children: PropTypes.number.isRequired,
};

export default PageButton;
