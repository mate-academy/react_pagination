import React from 'react';
import { Pagination } from './components/Pagination';
import './App.css';

class App extends React.Component {
  state = {
    total: 42,
    perPage: 5,
    page: 1,
  }

  render() {
    return (
      <div>
        <Pagination
          className="pagination"
          total={this.state.total}
          perPage={this.state.perPage}
          page={this.state.page}
        />
      </div>
    );
  }
}

export default App;
