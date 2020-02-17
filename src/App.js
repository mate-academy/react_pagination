import React from 'react';
import './App.css';
import { Pagination } from './components/Pagination/Pagination';
import { PerPageSelector } from './components/PerPageSelector/PerPageSelector';

export class App extends React.Component {
  state = {
    page: 1,
    perPage: 5,
    perPageOptions: [3, 5, 10, 20],
    withInfo: true,
  };

  onPageChange = page => this.setState({ page });

  onPerPageChange = (perPage) => {
    this.setState({
      perPage,
      page: 1,
    });
  };

  render() {
    const { page, perPage, withInfo, perPageOptions } = this.state;

    return (
      <>
        <PerPageSelector
          perPage={perPage}
          perPageOptions={perPageOptions}
          onPerPageChange={this.onPerPageChange}
        />
        <Pagination
          total={42}
          page={page}
          perPage={perPage}
          onPageChange={this.onPageChange}
          withInfo={withInfo}
        />
      </>
    );
  }
}
