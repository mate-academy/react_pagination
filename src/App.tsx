import React from 'react';
import './App.css';
import { Pagination } from './components/Pagination';

type State = {
  total: number;
  perPage: number;
  page: number;
};

class App extends React.Component<{}, State> {
  state: State = {
    total: 42,
    perPage: 5,
    page: 1,
  };

  onPageChange = (pageNum: number) => {
    this.setState({ page: pageNum });
  };

  onPerPageChange = (value: number) => {
    this.setState({
      perPage: value,
      page: 1,
    });
  };

  render() {
    const { total, perPage, page } = this.state;

    return (
      <div className="content">
        <h1>Pagination</h1>

        <div className="filter">
          <div>
            <span>PerPage:</span>
            <select
              name="perPage"
              id="perPage"
              value={perPage}
              onChange={(e) => {
                this.onPerPageChange(+e.target.value);
              }}
            >
              <option value="3">3</option>
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">20</option>
            </select>
          </div>
        </div>

        <Pagination
          total={total}
          perPage={perPage}
          page={page}
          withInfo
          onPageChange={this.onPageChange}
        />
      </div>
    );
  }
}

export default App;
