import React from 'react';
import './App.css';
import { Pagination } from './components/Pagination';
import { SelectPerPage } from './components/SelectPerPage';

export class App extends React.Component {
  state = {
    total: 42,
    perPage: 5,
    page: 1,
    withInfo: '1 - 5',
  };

  handlePageChange = (newPage) => {
    this.setState(state => ({
      page: newPage,
      withInfo:
      `
      ${(newPage - 1) * state.perPage + 1}
      -
      ${Math.min(newPage * state.perPage, state.total)}`,
    }));
  }

  onPerPageChange = (value) => {
    this.setState({
      perPage: value,
    });
  }

  render() {
    const {
      total,
      perPage,
      page,
      withInfo,
    } = this.state;

    return (
      <div className="App">
        <h1>Pagination</h1>
        <p>{`Info: ${withInfo} of ${total}`}</p>
        <SelectPerPage
          perPage={perPage}
          onPerPageChange={this.onPerPageChange}
        />
        <Pagination
          total={total}
          perPage={perPage}
          page={page}
          onPageChange={this.handlePageChange}
        />
      </div>
    );
  }
}
