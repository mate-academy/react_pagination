/* eslint-disable no-console */
import React from 'react';
import './App.css';
import { Pagination } from './components/Pagination';

type State = {
  totalItems: number,
  perPage: number,
  currentPage: number,
};

class App extends React.Component<{}, State> {
  state = {
    totalItems: 42,
    perPage: 5,
    currentPage: 1,
  };

  setPage = (name: string) => {
    if (+name) {
      return +name;
    }

    return (
      this.state.currentPage
      + (name === 'previous' ? -1 : 1)
    );
  };

  onPageChange = (event: React.MouseEvent<HTMLButtonElement>) => {
    const { name } = event.currentTarget;

    this.setState(state => ({
      ...state,
      currentPage: this.setPage(name),
    }));
  };

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;

    this.setState(state => ({
      ...state,
      [name]: value,
    }));
  };

  render() {
    const {
      totalItems, perPage,
      currentPage,
    } = this.state;

    const pages = Math.ceil(totalItems / (perPage || 5));
    const pagesArr = Object.keys(Array(pages).fill(1))
      .map(x => Number(x) + 1);
    const showingLiteral = `${(currentPage - 1) * perPage + 1}`
      + `-${Math.min(currentPage * perPage, totalItems)}`
      + ` of ${totalItems}`;

    return (
      <>
        <div>
          Total items:
          <input
            type="number"
            placeholder="total items"
            name="totalItems"
            value={totalItems}
            onChange={this.handleChange}
          />
        </div>

        <div>
          Items per page:
          <input
            type="number"
            placeholder="per page (default = 5)"
            name="perPage"
            value={perPage}
            max={totalItems}
            min={1}
            onChange={this.handleChange}
          />
        </div>
        <br />
        <p>{`Showing: ${showingLiteral} (page ${currentPage})`}</p>

        <Pagination
          {...this.state}
          pagesArr={pagesArr}
          pages={pages}
          onPageChange={this.onPageChange}
        />

      </>
    );
  }
}

export default App;
