import React from 'react';
import './App.css';
import { Pagination } from './components/Pagination';
import { SelectPerPage } from './components/SelectPerPage';

export class App extends React.Component {
  state = {
    total: 42,
    perPage: 5,
    page: 1,
  };

  handlePageChange = (newPage) => {
    this.setState(state => ({
      page: newPage,
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
    } = this.state;

    return (
      <div className="App">
        <h1>Pagination</h1>
        <p>
          {`Info: ${1 + (perPage * (page - 1))}
            - ${Math.min(page * perPage, total)} of ${total}`}
        </p>
        <SelectPerPage
          perPage={perPage}
          onPerPageChange={this.onPerPageChange}
        />
        <Pagination
          amount={Math.ceil(total / perPage)}
          current={page}
          onPageChange={this.handlePageChange}
        />
      </div>
    );
  }
}
