import React from 'react';
import './App.css';
import Pagination from './Component/Pagination';

class App extends React.Component {
  state = {
    page: 1,
    perPage: 5,
  };

  changePage = (page:number) => {
    this.setState({
      page,
    });
  };

  changePerPage = (perPage: number) => {
    this.setState({
      perPage,
    });
  };

  render() {
    return (
      <>
        <h1>Pagination</h1>
        <Pagination
          total={42}
          perPage={this.state.perPage}
          page={this.state.page}
          onPageChange={this.changePage}
          withInfo
          onPerPageChange={this.changePerPage}
        />
      </>
    );
  }
}

export default App;
