import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Pagination } from './components/Pagination';
import './App.css';

type State = {
  total: number,
  perPage: number,
  page: number,
};

class App extends React.Component<{}, State> {
  state = {
    total: 42,
    perPage: 5,
    page: 1,
  };

  onPageChange = (page: number) => {
    this.setState({ page });
  };

  toNextPage = () => {
    this.setState(state => ({
      page: state.page + 1,
    }));
  };

  toPrevPage = () => {
    this.setState(state => ({
      page: state.page - 1,
    }));
  };

  selectPerPage = (value: number) => {
    this.setState({
      perPage: value,
    });
  };

  render() {
    const { total, perPage, page } = this.state;

    return (
      <>
        <h1>Pagination</h1>
        <Routes>
          <Route
            path="/"
            element={(
              <Pagination
                total={total}
                perPage={perPage}
                page={page}
                onPageChange={this.onPageChange}
                toNextPage={this.toNextPage}
                toPrevPage={this.toPrevPage}
                selectPerPage={this.selectPerPage}
              />
            )}
          />
        </Routes>
        {/* <Pagination
          total={total}
          perPage={perPage}
          page={page}
          onPageChange={this.onPageChange}
          toNextPage={this.toNextPage}
          toPrevPage={this.toPrevPage}
          selectPerPage={this.selectPerPage}
        /> */}
      </>
    );
  }
}

export default App;
