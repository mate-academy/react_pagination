import React from 'react';

import { Pagination } from '../Pagination';

import './App.css';

type State = {
  total: number,
  perPage: number,
  page: number,
};

export class App extends React.Component<{}, State> {
  state = {
    total: 42,
    perPage: 5,
    page: 1,
  };

  pageChange = (num: number) => {
    this.setState({
      page: num,
    });
  };

  render() {
    const { total, perPage, page } = this.state;

    return (
      <div className="App">
        <div>
          <span>Step: </span>
          <select
            name=""
            id=""
            value={this.state.perPage}
            onChange={(event) => (
              this.setState({
                perPage: +event.target.value,
              })
            )}
          >
            <option value="3">3</option>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
          </select>
        </div>
        <Pagination
          total={total}
          perPage={perPage}
          page={page}
          pageChange={this.pageChange}
        />
      </div>
    );
  }
}
