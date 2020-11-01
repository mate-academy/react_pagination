import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';
import { Pagination } from './components/Pagination';
import { Select } from './components/Select';

class App extends React.PureComponent {
  selectValues = [3, 5, 10, 20];

  state = {
    total: 42,
    perPage: 5,
    page: 1,
  }

  onPageChange = (currentPage) => {
    this.setState({
      page: currentPage,
    });
  }

  onPerPageChange = (newPerPage) => {
    this.setState({
      perPage: newPerPage,
      page: 1,
    });
  }

  makeInfo = () => {
    const { total, perPage, page } = this.state;
    const firstItem = ((page * perPage) - perPage) + 1;
    const lastItem = (page * perPage) > total ? total : page * perPage;

    return `${firstItem} - ${lastItem} of ${total}`;
  }

  render() {
    const {
      state: { page, total, perPage },
      onPageChange,
      onPerPageChange,
      makeInfo,
      selectValues,
    } = this;

    return (
      <div className="d-flex flex-column App">
        <Select
          selectValues={selectValues}
          onPerPageChange={onPerPageChange}
          perPage={perPage}
        />
        <span className="p-2">{makeInfo()}</span>
        <Pagination
          total={total}
          perPage={perPage}
          page={page}
          onPageChange={onPageChange}
        />
      </div>
    );
  }
}

export default App;
