import React from 'react';
import words from './list/list.json';
import './App.css';

import { Pagination } from './Components/Pagination';
import { List } from './Components/List';

class App extends React.Component {
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

  toPage = (event) => {
    const { step } = this.state;
    const { value } = event.target;

    this.setState({ start: step * (value - 1) });
  }

  render() {
    const { start, step } = this.state;

    return (
      <div className="pagination">
        <h1 className="heading">Pagination</h1>

        <select
          value={step}
          onChange={event => this.setState({
            step: +event.target.value,
            start: 0,
          })}
          className="pagination__select"
        >
          {[...Array(10)].map((_, i) => {
            const item = i;

            return (
              <option key={item}>{ i + 1 }</option>
            );
          })}
        </select>

        <List
          start={start}
          step={step}
          words={words}
        />

        <Pagination
          start={start}
          step={step}
          toNext={this.toNext}
          toPrev={this.toPrev}
          toPage={this.toPage}
        />
      </div>
    );
  }
}

export default App;
