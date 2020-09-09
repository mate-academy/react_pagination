import React from 'react';
import './App.css';
import { Pagination } from './components/Pagination';

class App extends React.Component {
  state = {
    totalElements: 42,
    perPage: 3,
    currentPage: 1,
    withInfo: true,
  }

  pageChange = (page) => {
    if (page === 0) {
      return;
    }

    this.setState({
      currentPage: page,
    });
  }

  perPageChange = (event) => {
    const { value } = event.target;

    this.setState({
      perPage: +value,
      currentPage: 1,
    });
  }

  render() {
    const { totalElements, perPage, currentPage, withInfo } = this.state;

    return (
      <Pagination
        total={totalElements}
        perPage={perPage}
        page={currentPage}
        pageChange={this.pageChange}
        perPageChange={this.perPageChange}
        info={withInfo}
      />
    );
  }
}

export default App;
