import React from 'react';
import InternalButtons from './InternalButtons';

class Buttons extends React.Component {
  render() {
    const {
      changeCurrentButton, page, changePage,
      total, perPage, drawButtons,
    } = this.props;

    const buttonsCount = Math.ceil(total / +perPage);
    const buttons = drawButtons(buttonsCount);

    const button = [...new Set(buttons).values()];

    if (page >= 4 && page <= buttonsCount - 3) {
      button.splice(-1, 0, 'lastDot')
    }

    return (
      <>
        <button
          type="button"
          onClick={() => changePage(-1)}
          disabled={page === 1}
          className="direction"
        >
          Prev
        </button>
        <InternalButtons
          changeCurrentButton={changeCurrentButton}
          button={button}
          page={page}
        />
        <button
          type="button"
          onClick={() => changePage(1)}
          disabled={page === buttonsCount}
          className="direction"
        >
          Next
        </button>
      </>
    );
  }
}

export default Buttons;
