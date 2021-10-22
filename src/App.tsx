import React from 'react';
import './App.css';
import { Pagination } from './Components/Pagination';

type State = {
  perPage: number,
  selectedPage: number,
};

const selectValues = [3, 5, 8, 10, 20];

class App extends React.Component<{}, State> {
  state = {
    perPage: 5,
    selectedPage: 1,
  };

  setPage = (page: number) => {
    this.setState(state => ({
      ...state,
      selectedPage: page,
    }));
  };

  setPerPage = (event: React.ChangeEvent<HTMLSelectElement>, firstItemOnPage: number) => {
    const newPerPage = +event.target.value;
    const newPage = ((firstItemOnPage - (firstItemOnPage % newPerPage)) / newPerPage) + 1;

    this.setState({
      selectedPage: newPage,
      perPage: +event.target.value,
    });
  };

  render() {
    return (
      <div>
        <Pagination
          total={42}
          perPage={this.state.perPage}
          withInfo
          selectValues={selectValues}
          page={this.state.selectedPage}
          onPageChange={this.setPage}
          onPerPageChange={this.setPerPage}
        />
      </div>
    );
  }
}

export default App;
