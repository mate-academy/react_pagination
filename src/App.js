import React from 'react';
import './App.scss';
import Pagination from './components/Pagination';

class App extends React.Component {
  state = {
    perPage: 5,
    currentPage: 1,
  }

  onPageChange = (currentPage) => {
    this.setState({ currentPage });
  }

  render() {
    return (
      <Pagination
        total={42}
        perPage={this.state.perPage}
        page={this.state.currentPage}
        handleChange={this.onPageChange}
      />
    );
  }
}

export default App;
