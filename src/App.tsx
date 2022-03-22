import React from 'react';
import './App.scss';

import { Pagination } from './components/Pagination/Pagination';

interface State {
  total: number,
  perPage: number,
  page: number,
}

export class App extends React.Component<{}, State> {
  state: State = {
    total: 42,
    perPage: 5,
    page: 1,
  };

  nextPage = () => {
    this.setState(state => ({
      page: state.page + 1,
    }));
  };

  previousPage = () => {
    this.setState(state => ({
      page: state.page - 1,
    }));
  };

  onPageChange = (current: number) => {
    this.setState({
      page: current,
    });
  };

  onPerPageChange = (event:React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({
      perPage: +event.target.value,
      page: 1,
    });
  };

  render() {
    const { total, perPage, page } = this.state;

    return (
      <div className="container">
        <div className="content">
          <label
            className="page_select"
            htmlFor="perPage"
          >
            Number of pages to display
            <select
              value={perPage}
              onChange={this.onPerPageChange}
            >
              <option value="3">3</option>
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">20</option>
            </select>
          </label>

          <Pagination
            total={total}
            perPage={perPage}
            currentPage={page}
            pageChange={this.onPageChange}
            nextPage={this.nextPage}
            previousPage={this.previousPage}
          />
        </div>
      </div>
    );
  }
}

export default App;
