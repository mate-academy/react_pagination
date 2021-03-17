import React from 'react';
import { Pagination } from './components/Pagination';
import './App.css';

class App extends React.Component {
  state = {
    total: 42,
    perPage: 5,
    page: 1,
  }

  inPageChange = (pageTarget) => {
    this.setState({
      page: pageTarget.value,
    });
  }

  prevPage = (page) => {
    if (this.state.page === 1) {
      return;
    }

    this.setState(prevState => ({
      page: prevState.page - 1,
    }));
  }

  nextPage = (page) => {
    if (this.state.page === (
      Math.ceil(this.state.total / this.state.perPage)
    )) {
      return;
    }

    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  }

  render() {
    return (
      <div>
        <Pagination
          className="pagination"
          total={this.state.total}
          perPage={this.state.perPage}
          page={this.state.page}
          inPageChange={this.inPageChange}
          prevPage={this.prevPage}
          nextPage={this.nextPage}
        />
      </div>
    );
  }
}

export default App;
