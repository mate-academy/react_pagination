import React from 'react';
import { Pagination } from './components/Pagination';
import './App.css';

class App extends React.Component {
  state = {
    currentPage: 1,
  };

  currentPageChangeHandler = (page) => {
    this.setState({ currentPage: page });
  }

  render() {
    return (
      <div>
        <h1>Pagination</h1>

        <Pagination
          total={12}
          perPage={5}
          currentPage={this.state.currentPage}
          pageChanger={this.currentPageChangeHandler}
        />
      </div>
    );
  }
}

export default App;
