import React from 'react';
import { Pagination } from './components/Pagination/Pagination';
import './App.css';

class App extends React.Component {
  state = {
    page: 5,
    perPage: 4,
  };

  onPageChanged = (page) => {
    this.setState({
      page,
    });
  }

  onPerPageChanged = (perPage) => {
    this.setState({
      perPage,
    });
  }

  render() {
    return (
      <Pagination
        total={42}
        page={this.state.page}
        perPage={this.state.perPage}
        withInfo
        onPageChanged={this.onPageChanged}
        onPerPageChanged={this.onPerPageChanged}
      />
    );
  }
}

export default App;
