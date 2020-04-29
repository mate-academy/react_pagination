import React from 'react';
import PropTypes, { number } from 'prop-types';

const Buttons = ({
  buttonCount, page, changePage, changeCurrentButton,
}) => (
  <>
    <button
      type="button"
      onClick={() => changePage(-1)}
      disabled={page === 1}
      className="direction"
    >
      Prev
    </button>
    {buttonCount.map(button => (
      <button
        onClick={() => changeCurrentButton(button)}
        type="button"
        key={button}
        className={button === page
          ? 'button--active button'
          : 'button--disabled button'
        }
      >
        {button}
      </button>
    ))}
    <button
      type="button"
      onClick={() => changePage(1)}
      disabled={page === buttonCount[buttonCount.length - 1]}
      className="direction"
    >
      Next
    </button>
  </>
);

Buttons.propTypes = {
  buttonCount: PropTypes.arrayOf(number).isRequired,
  page: PropTypes.number.isRequired,
  changePage: PropTypes.func.isRequired,
  changeCurrentButton: PropTypes.func.isRequired,
};

export default Buttons;
