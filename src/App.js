import React, { Component } from 'react';
import './App.css';
import { Pagination } from './components/Pagination';
import { SelectPerPage } from './components/SelectPerPage';

class App extends Component {
  state = {
    total: 42,
    perPage: 5,
    page: 1,
  }

  constrols = (page) => {
    this.setState({
      page,
    });
  };

  onPerPageChange = (event) => {
    const { value } = event.target;

    this.setState({
      perPage: +value,
      page: 1,
    });
  }

  render() {
    const { total, perPage, page } = this.state;

    return (
      <div className="container">
        <SelectPerPage
          perPage={perPage}
          onPerPageChange={this.onPerPageChange}
        />

        <Pagination
          total={total}
          perPage={perPage}
          page={page}
          constrols={this.constrols}
        />
      </div>
    );
  }
}

export default App;
