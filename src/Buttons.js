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

    const mySet = new Set(buttons);
    const button = [...mySet.values()];

    if (page >= 4 && page <= buttonsCount - 3) {
      const popButton = button.pop();

      button.push('dotLast', popButton);
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
          disabled={page === buttonsCount.length}
          className="direction"
        >
          Next
        </button>
      </>
    );
  }
}

export default Buttons;
