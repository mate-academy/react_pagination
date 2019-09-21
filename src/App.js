import React from 'react';
import './App.css';
import Pagination from './components/Pagination';

class App extends React.Component {
  state = {
    currentPage: 1,
  };

  onPageChange = (currentPage) => {
    this.setState({ currentPage });
  };

  render() {
    return (
      <div className="App">
        <h1>tabs</h1>

        <Pagination
          total={42}
          perPage={5}
          page={this.state.currentPage}
          onPageChange={this.onPageChange}
          withInfo
        />
      </div>
    );
  }
}

export default App;
