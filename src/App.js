import React from 'react';
import './App.css';
import { Pagination } from './Components/Pagination';

class App extends React.Component {
  state = {
    selectedPage: 1,
    firstVisiblePage: 1,
    total: 42,
    perPage: 5,
    withInfo: true,
  }

  nextPage = () => {
    if (this.state.firstVisiblePage + this.state.perPage > this.state.total) {
      return;
    }

    this.setState(state => ({
      firstVisiblePage: state.firstVisiblePage + state.perPage,
    }));
  }

  prevPage = () => {
    if (this.state.firstVisiblePage === 1) {
      return;
    }

    this.setState((state) => {
      const currentPage = state.firstVisiblePage - state.perPage < 1
        ? 1
        : state.firstVisiblePage - state.perPage;

      return ({
        firstVisiblePage: currentPage,
      });
    });
  };

  onPageChange = (page) => {
    this.setState({
      selectedPage: page,
    });
  };

  onPerPageChange = ({ target }) => {
    if (+target.value !== this.state.perPage) {
      this.setState({
        perPage: +target.value,
      });
    }
  };

  render() {
    const { total, perPage, firstVisiblePage, withInfo } = this.state;

    return (
      <>
        <h1>Pagination</h1>
        <select value={perPage} onChange={this.onPerPageChange}>
          <option value="3">3</option>
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
        </select>

        <Pagination
          firstVisiblePage={firstVisiblePage}
          prevPage={this.prevPage}
          nextPage={this.nextPage}
          onPageChange={this.onPageChange}
          total={total}
          perPage={perPage}
          page={this.state.selectedPage}
          withInfo={withInfo}
        />
      </>
    );
  }
}

export default App;
