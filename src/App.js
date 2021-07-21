import React from 'react';
import './App.css';
import { Pagination } from './Components/Pagination';

class App extends React.Component {
  state = {
    selectedPage: 1,
    total: 42,
    perPage: 5,
    withInfo: true,
  }

  nextPage = () => {
    this.setState(state => ({
      selectedPage: state.selectedPage + 1,
    }));
  }

  prevPage = () => {
    this.setState(state => ({
      selectedPage: state.selectedPage - 1,
    }));
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
        selectedPage: 1,
      });
    }
  };

  render() {
    const { total, perPage, withInfo } = this.state;

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
