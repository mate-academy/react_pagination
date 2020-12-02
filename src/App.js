import React from 'react';
import './App.css';
import { Pagination } from './components/Pagination';
import { SelectPerPage } from './components/SelectPerPage';

export class App extends React.Component {
  state = {
    total: 42,
    perPage: 5,
    page: 1,
    paginationInfo: '',
  };

  componentDidMount() {
    this.updatePaginationInfo();
  }

  updatePaginationInfo = () => {
    this.setState(state => ({
      paginationInfo: `${1 + (state.perPage * (state.page - 1))}
      - ${Math.min(state.page * state.perPage, state.total)}`,
    }));
  }

  handlePageChange = (newPage) => {
    this.setState({
      page: newPage,
    });
    this.updatePaginationInfo();
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
      paginationInfo,
    } = this.state;

    return (
      <div className="App">
        <h1>Pagination</h1>
        <p>
          {`Pagination Info: ${paginationInfo} of ${total}`}
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
