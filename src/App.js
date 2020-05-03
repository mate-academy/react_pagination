import React from 'react';
import './App.css';
import Pagination from './Component/Pagination/Pagination';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
    };
  }

  onPageChange = (selectedPage) => {
    this.setState({ currentPage: selectedPage });
  }

  render() {
    return (
      <Pagination
        total={42}
        perPage={5}
        page={this.state.currentPage}
        onPageChange={this.onPageChange}
      />
    );
  }
}

export default App;
