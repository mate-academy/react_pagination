import React from 'react';
import { Pagination } from './components/Pagination';
import { Select } from './components/Select';

import './App.scss';

type State = {
  total: number,
  perPage: number,
  page: number,
};

export default class App extends React.Component {
  state: State = {
    total: 42,
    perPage: 5,
    page: 1,
  };

  onPageChange = (page: number) => {
    this.setState({ page });
  };

  onPerPageChange = (perPage: number) => {
    this.setState({ perPage });
  };

  render() {
    const { total, perPage, page } = this.state;

    return (
      <>
        <h1>Pagination</h1>
        <div className="App__pagination">
          <Select
            onPerPageChange={this.onPerPageChange}
            perPage={perPage}
          />
          <Pagination
            total={total} /* required */
            perPage={perPage} /* optional with 5 by default */
            page={page} /* optional with 1 by default */
            onPageChange={this.onPageChange}
          />
        </div>
      </>
    );
  }
}
