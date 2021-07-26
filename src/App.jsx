import React from 'react';
import './App.css';
import { Pagination } from './components/Pagination';
import { PaginationSelect } from './components/PaginationSelect';

class App extends React.Component {
  state = {
    total: 42,
    perPage: 5,
    page: 1,
    selectRange: [1, 2, 3, 4, 5, 10, 15, 20, 30, 40],
  };

  onPageChange = (currentPage) => {
    this.setState({ page: currentPage });
  }

  onPerPageChange = (event) => {
    this.setState({
      perPage: Number(event.target.value),
      page: 1,
    });
  }

  render() {
    const {
      total,
      perPage,
      page,
      selectRange,
    } = this.state;

    return (
      <div className="App">
        <Pagination
          total={total}
          perPage={perPage}
          page={page}
          onPageChange={this.onPageChange}
        />
        <div className="input-group mb-3">
          <label
            className="input-group-text"
            htmlFor="inputGroupSelect01"
          >
            Choose amount of items per page
          </label>
          <PaginationSelect
            selectId="inputGroupSelect01"
            range={selectRange}
            value={perPage}
            action={this.onPerPageChange}
          />
        </div>
      </div>
    );
  }
}

export default App;
