import React, { Component } from 'react';
import './App.css';
import { Pagination } from './components/Pagination';

export class App extends Component {
  state = {
    perPage: 5,
    total: 42,
    page: 1,
  }

  onChangePerPage = (quantity) => {
    this.setState({
      perPage: +quantity,
    });
  }

  render() {
    const { perPage, total, page } = this.state;
    const { onChangePerPage } = this;

    return (
      <>
        <h1>Pagination</h1>
        <Pagination
          total={total}
          perPage={perPage}
          page={page}
          onChange={onChangePerPage}
        />
      </>
    );
  }
}
