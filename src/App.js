import React, { Component } from 'react';
import './App.scss';
import { BrowserRouter, Route } from 'react-router-dom';
import Pagination from './components/Pagination';

class App extends Component {
  state = {
    total: 142,
    perPage: 8,
    page: 1,
  }

  onPageChange = (event) => {
    const values = {
      next: 1, prev: -1,
    };

    const acc = (values[event.target.value]);

    this.setState(prev => ({
      page: prev.page + acc,
    }));
  }

  render() {
    return (
      <BrowserRouter>
        <Route
          path="/"
          component={() => (
            <Pagination
              total={this.state.total}
              perPage={this.state.perPage}
              page={this.state.page}
              withInfo
              onPageChange={this.onPageChange}
            />
          )}
        />
      </BrowserRouter>
    );
  }
}
export default App;
