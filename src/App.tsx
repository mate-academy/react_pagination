import React from 'react';
import './App.css';
import { Pagination } from './Components/Pagination/Pagination';

type State = {
  total: number,
  page: number,
  step: number,
};

class App extends React.Component<{}, State> {
  state = {
    total: 42,
    page: 1,
    step: 3,
  };

  changePage = (np: number) => {
    let newPage = np;

    if (newPage < 1) {
      newPage = 1;
    }

    if (newPage > Math.ceil(this.state.total / this.state.step)) {
      newPage = Math.ceil(this.state.total / this.state.step);
    }

    this.setState({ page: newPage });
  };

  changeStep = (value: number) => {
    this.setState({
      step: value,
      page: 1,
    });
  };

  render() {
    const { total, page, step } = this.state;

    return (
      <div className="app">
        <label htmlFor="selectStep">
          Select step:&nbsp;
          <select
            className="select-step"
            id="selectStep"
            value={step}
            onChange={(event) => {
              this.changeStep(+event.target.value);
            }}
          >
            <option value="3">3</option>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
          </select>
        </label>
        <Pagination
          total={total}
          page={page}
          step={step}
          changePage={this.changePage}
        />
      </div>
    );
  }
}

export default App;
