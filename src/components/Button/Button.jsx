import React from 'react';
import PropTypes from 'prop-types';

export function Button({
  onDisable,
  onChangeStep,
  text,
  name,
}) {
  return (
    <button
      type="button"
      disabled={onDisable}
      className={name}
      onClick={onChangeStep}
    >
      {text}
    </button>
  );
}

Button.propTypes = {
  onChangeStep: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onDisable: PropTypes.bool.isRequired,
};
