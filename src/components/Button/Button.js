import React from 'react';
import PropTypes from 'prop-types';

export const Button = ({ buttonIndex, buttonsAmount, onPageChange, page }) => {
  const isCurrent = page === buttonIndex;
  const isFirst = buttonIndex === 1;
  const isLast = buttonIndex === buttonsAmount;

  const isPrecurrent = buttonIndex - 1 > 1
    && buttonIndex === page - 1;
  const isPostcurrent = buttonIndex + 1 < buttonsAmount
    && buttonIndex === page + 1;

  const isSnown = isFirst || isLast || isCurrent
    || buttonIndex === page - 1 || buttonIndex === page + 1;

  return (
    <>
      {
        isPrecurrent && <div className="page-link">...</div>
      }
      <button
        type="button"
        className="page-link"
        hidden={!isSnown}
        onClick={() => onPageChange(buttonIndex)}
      >
        {buttonIndex}
      </button>
      {
        isPostcurrent && <div className="page-link">...</div>
      }
    </>
  );
};

Button.propTypes = {
  buttonIndex: PropTypes.number.isRequired,
  buttonsAmount: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
};
