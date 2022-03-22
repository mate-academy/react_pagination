import React from 'react';
import { Pagination } from './Pagination';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends React.Component {
  state = {
    total: 42,
    perPage: 5,
    page: 1,
  };

  onPageChange = (event: number) => {
    this.setState({ page: event });
  };

  render() {
    const {
      total,
      page,
      perPage,
    } = this.state;

    return (
      <>
        <h1>Pagination</h1>
        <select
          value={perPage}
          onChange={(event) => this.setState({
            perPage: event.target.value,
            page: 1,
          })}
        >
          <option>3</option>
          <option>5</option>
          <option>10</option>
          <option>20</option>
        </select>
        <Pagination
          total={total}
          perPage={perPage}
          page={page}
          onPageChange={this.onPageChange}
        />
      </>
    );
  }
}

export default App;
