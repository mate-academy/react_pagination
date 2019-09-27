import React from 'react';

import Pagination from './Pagination';

import './App.css';

class App extends React.Component {
  state = {
    page: 0,
    perPage: 5,
    total: 42,
  };

  onPageChange = (changedPage) => {
    this.setState({
      page: changedPage,
    });
  }

  onPerPageChange = ({ target: { value } }) => {
    this.setState({
      perPage: +value,
    });
  }

  render() {
    const { page, perPage, total } = this.state;

    return (
      <div className="app">
        <Pagination
          total={total}
          perPage={perPage}
          page={page}
          preparedArrPages={Array(Math.ceil(total / perPage))}
          onPageChange={this.onPageChange}
          onPerPageChange={this.onPerPageChange}
        />
      </div>
    );
  }
}

export default App;
