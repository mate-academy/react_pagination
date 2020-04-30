import React from 'react';

const InternalButtons = ({ button, changeCurrentButton, page }) => (
  button.map((btn, i) => {
    if (typeof btn === 'number') {
      return (
        <button
          onClick={() => changeCurrentButton(btn)}
          type="button"
          key={btn + i}
          className={btn === page
            ? 'button--active button'
            : 'button--disabled button'
          }
        >
          {btn}
        </button>
      );
    }

    if (typeof btn === 'string') {
      return (
        <span className="dot" key={btn}>...</span>
      );
    }
  })
);

export default InternalButtons;
