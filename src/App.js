import React from 'react';
import './App.css';
import Pagination from './Pagination';

export class App extends React.Component {
  state = {
    total: 10,
    perPage: 5,
    page: 1,
    currentPage: 1,
    btnNextDisabled: false,
    btnPrevDisabled: true,
  };

  onPageChange = (selectPage) => {
    this.setState({ currentPage: selectPage });
  };

  nextPage = () => {
    this.setState({ btnPrevDisabled: false });
    if (this.state.currentPage === this.state.total) {
      this.setState({ btnNextDisabled: true });

      return;
    }

    if (this.state.currentPage === this.state.perPage) {
      this.setState(state => ({
        currentPage: state.currentPage + 1,
        page: state.page + 1,
        perPage: state.perPage + 1,
      }));
    } else {
      this.setState(state => ({ currentPage: state.currentPage + 1 }));
    }
  };

  prevPage = () => {
    this.setState({ btnNextDisabled: false });
    if (this.state.currentPage === 1) {
      this.setState({ btnPrevDisabled: true });

      return;
    }

    if (this.state.currentPage === this.state.page) {
      this.setState(state => ({
        currentPage: state.currentPage - 1,
        page: state.page - 1,
        perPage: state.perPage - 1,
      }));
    } else {
      this.setState(state => ({ currentPage: state.currentPage - 1 }));
    }
  };

  render() {
    return (
      <>
        <h1>Pagination</h1>
        <Pagination
          total={this.state.total}
          perPage={this.state.perPage}
          page={this.state.page}
          currentPage={this.state.currentPage}
          nextPage={this.nextPage}
          prevPage={this.prevPage}
          onPageChange={this.onPageChange}
          btnNextDisabled={this.state.btnNextDisabled}
          btnPrevDisabled={this.state.btnPrevDisabled}
        />
      </>
    );
  }
}

export default App;
