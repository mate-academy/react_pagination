import React from 'react';
import PropTypes from 'prop-types';

export function Button({
  extractedPages,
  onChangeStep,
  text,
  name,
}) {
  return (
    <button
      type="button"
      disabled={extractedPages}
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
  extractedPages: PropTypes.bool.isRequired,
};
