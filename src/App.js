import React from 'react';
import './App.css';

import { Pagination } from './components/Pagination';

class App extends React.PureComponent {
  state = {
    total: 42,
    perPage: 5,
    page: 1,
  }

  onPageChange = (page) => {
    if (this.state.page === page) {
      return;
    }

    this.setState({
      page,
    });
  };

  onPerPageChange = ({ target }) => {
    const newPerPage = +target.value;

    if (this.state.perPage === newPerPage) {
      return;
    }

    this.setState({
      perPage: newPerPage,
    });
  };

  showInfo = () => {
    const { total, perPage, page } = this.state;
    const fromItem = page * perPage - perPage + 1;
    const toItem = page * perPage <= total
      ? page * perPage
      : total;

    return `${fromItem} - ${toItem} of ${total}`;
  };

  render() {
    const { total, perPage, page } = this.state;
    const selectOptions = [3, 5, 10, 20];

    return (
      <div className="app">
        <h1>Pagination</h1>
        <Pagination
          total={total}
          perPage={perPage}
          page={page}
          onPageChange={this.onPageChange}
          showInfo={this.showInfo}
          withInfo
        />

        <div>
          <p>Items per page:</p>
          <select
            className="custom-select select"
            value={perPage}
            onChange={this.onPerPageChange}
          >
            {selectOptions.map(option => (
              <option key={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>
    );
  }
}

export default App;
