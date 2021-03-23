import React, { Component } from 'react';
import './App.css';
import { Pagination } from './components/Pagination';

export class App extends Component {
  state = {
    perPage: 5,
  }

  onChangePerPage = (quantity) => {
    this.setState({
      perPage: +quantity,
    });
  }

  render() {
    const { perPage } = this.state;
    const { onChangePerPage } = this;

    return (
      <>
        <h1>Pagination</h1>
        <Pagination
          total={42}
          perPage={perPage}
          page={1}
          withInfo={6}
          onChange={onChangePerPage}
        />
      </>
    );
  }
}
