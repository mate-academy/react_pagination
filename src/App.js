import React from 'react';
import { Pagination } from './components/Pagination/Pagination';
import './App.css';

class App extends React.Component {
  state = {
    page: 5,
  };

  onPageChanged = (page) => {
    this.setState({
      page,
    });
  }

  render() {
    return (
      <Pagination
        total={42}
        page={this.state.page}
        perPage={4}
        onPageChanged={this.onPageChanged}
      />
    );
  }
}

export default App;
