import React from 'react';
import './App.css';
import { Pagination } from './Pagination/Pagination';

type State = {
  total: number,
  perPage: number,
  page: number,
};

class App extends React.Component<{}, State> {
  state: State = {
    total: 42,
    perPage: 5,
    page: 1,
  };

  toNextPage = () => {
    this.setState(state => ({
      page: state.page + 1,
    }));
  };

  toPrevPage = () => {
    this.setState(state => ({
      page: state.page - 1,
    }));
  };

  onPageChange = (page: number) => {
    this.setState({ page });
  };

  onPerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({
      perPage: +event.target.value,
      page: 1,
    });
  };

  render() {
    const { total, perPage, page } = this.state;

    return (
      <div className="App">
        <h1 className="App_title">
          Pagination
        </h1>
        <div>
          <label
            htmlFor="perPage"
            className="App_subtitle"
          >
            Items per page
          </label>
          <select
            name="perPage"
            id="perPage"
            value={perPage}
            onChange={this.onPerPageChange}
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
          currentPage={page}
          onPageChange={this.onPageChange}
          toNextPage={this.toNextPage}
          toPrevPage={this.toPrevPage}
        />
      </div>
    );
  }
}

export default App;
