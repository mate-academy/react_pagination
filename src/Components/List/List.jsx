import React from 'react';
import words from '../../list/list.json';

import './List.css';

export class List extends React.Component {
  state = {
    start: 0,
    step: 5,
  }

  toNext = () => {
    const { start, step } = this.state;
    let max = start + step;

    if (max >= words.length) {
      max = words.length - 1;
    }

    this.setState({ start: max });
  }

  toPrev = () => {
    const { start, step } = this.state;
    let min = start - step;

    if (min < 0) {
      min = 0;
    }

    this.setState({ start: min });
  }

  render() {
    const { start, step } = this.state;

    const buttons = [...Array(words.length / step)].map((item, i) => i + 1);

    return (
      <div
        className="pagination"
      >
        <select
          value={step}
          onChange={event => this.setState({ step: +event.target.value })}
          className="pagination__select"
        >
          {[...Array(10)].map((_, i) => {
            const item = i;

            return (
              <option key={item}>{ i + 1 }</option>
            );
          })}
        </select>
        <div
          className="pagination__list"
        >
          {words.slice(start, start + step)
            .map((word, i) => (
              <p
                className="pagination__item"
                key={word}
              >
                <span
                  className="pagination__number"
                >
                  {start + i + 1}
                </span>
                <span
                  className="pagination__word"
                >
                  {word}
                </span>
              </p>
            ))}
        </div>

        <div
          className="pagination__buttons"
        >
          <button
            type="button"
            onClick={this.toPrev}
            className="pagination__button"
            disabled={start === 0 && true}
          >
            Prev
          </button>

          {buttons.map((button, i) => (
            <button
              className={`${((button - 1) * step === start
                  || (button - 1) * step === start + step
                    || (button - 1) * step === start - step
                     || button === 1
                      || button === buttons.length)
                ? 'pagination__button'
                : 'pagination__button--none'}
                ${((button - 1) * step === start)
                  && 'pagination__button--active'}`}
              key={button}
              type="button"
              onClick={() => {
                this.setState({ start: step * (button - 1) });
              }}
            >
              {((button - 1) * step === start
                || (button - 1) * step === start + step
                  || (button - 1) * step === start - step
                   || button === 1
                    || button === buttons.length) ? button : '.'}
            </button>
          ))}

          <button
            className="pagination__button"
            type="button"
            onClick={this.toNext}
            disabled={start === words.length - step && true}
          >
            Next
          </button>
        </div>
      </div>
    );
  }
}
