import React from 'react';
import './App.css';
import Pagination from './components/Pagination';

interface State {
  page: any;
}

class App extends React.Component<{}, State> {
  state = {
    total: 42,
    perPage: 5,
    page: 1,
  };

  onPageChange = (event: any, key: number) => {
    event.preventDefault();

    this.setState({
      page: key,
    });
  };

  render() {
    const { total, perPage, page } = this.state;

    return (
      <div>
        <h1>Pagination</h1>

        <Pagination
          total={total}
          perPage={perPage}
          page={page}
          withInfo
          handleClick={this.onPageChange}
        />
      </div>
    );
  }
}

export default App;
