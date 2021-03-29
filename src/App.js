import React from 'react';
import './App.css';
import { Pagination } from './Pagination';
import 'bulma';

const perPagesList = [3, 5, 10, 20];

class App extends React.Component {
  state = {
    totalPages: 42,
    activePage: 1,
    perPage: 10,
  }

  chooseNextPage = (event) => {
    event.preventDefault();

    this.setState(prevState => ({
      activePage: prevState.activePage + 1,
    }));
  }

  choosePreviousPage = (event) => {
    event.preventDefault();

    this.setState(prevState => ({
      activePage: prevState.activePage - 1,
    }));
  }

  setActivePage = (page) => {
    this.setState({
      activePage: page,
    });
  }

  setPerPage = (event) => {
    this.setState({
      perPage: parseInt(event.target.value, 10),
      activePage: 1,
    });
  }

  render() {
    const {
      totalPages,
      perPage,
      activePage,
    } = this.state;

    return (
      <div className="container">
        <h1 className="title is-3">Pagination</h1>
        <Pagination
          total={totalPages} /* required */
          perPage={perPage}
          activePage={activePage}
          perPagesList={perPagesList}
          onNext={this.chooseNextPage}
          onPrevious={this.choosePreviousPage}
          onPageChange={this.setActivePage}
          onChangePerPage={this.setPerPage}
        />
      </div>
    );
  }
}

export default App;
