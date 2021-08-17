import React from 'react';
import './App.css';
import { Pagination } from './components/Pagination';

export class App extends React.PureComponent {
  state = {
    page: 1,
    total: 42,
    perPage: 5,
  }

  handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    this.setState({
      [name]: type === 'checkbox'
        ? checked
        : value,
    });
  }

  onPageChanged = (event) => {
    event.preventDefault();

    this.setState({
      page: event.target.value,
    });
  }

  render() {
    const { total, perPage, page } = this.state;

    return (
      <Pagination
        total={total}
        perPage={perPage}
        page={page}
        changePerPage={this.handleChange}
        onPageChanged={this.onPageChanged}
      />
    );
  }
}
