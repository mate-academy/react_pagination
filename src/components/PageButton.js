import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

const PageButton = ({ onSwitch, children, disabled, active }) => (
  <button
    disabled={disabled}
    className={cn('ui violet button paginator__button', {
      basic: active,
    })}
    type="button"
    onClick={onSwitch}
  >
    {children}
  </button>
);

PageButton.defaultProps = {
  onSwitch: () => {},
  disabled: false,
  active: false,
};

PageButton.propTypes = {
  onSwitch: PropTypes.func,
  disabled: PropTypes.bool,
  active: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
};

export default PageButton;
