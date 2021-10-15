import React from 'react';
import './App.css';
import Pagination from './components/Pagination/Pagination';

type State = {
  total: number,
  perPage: number,
  page: number,
  options: number[],
};

class App extends React.Component<{}, State> {
  state: State = {
    total: 42,
    perPage: 5,
    page: 1,
    options: [3, 5, 10, 20],
  };

  changePage = (page: number) => {
    this.setState({
      page,
    });
  };

  onPerPageChange = (perPage: number) => {
    this.setState({
      perPage,
    });
  };

  render() {
    const {
      perPage,
      page,
      total,
      options,
    } = this.state;

    return (
      <div className="App">
        <h1>Pagination</h1>
        <Pagination
          total={total}
          perPage={perPage}
          page={page}
          onPageChange={this.changePage}
          options={options}
          onPerPageChange={this.onPerPageChange}
          withInfo
        />
      </div>
    );
  }
}

export default App;
