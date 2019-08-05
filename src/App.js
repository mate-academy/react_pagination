import React from 'react';
import './App.css';
import Pagination from './Pagination';

class App extends React.Component {
  state = {
    total: 42,
    perPage: 5,
    activePage: 1,
    firstPostOnPage: 1,
    lastPostOnPage: 5,
  };

  onPageChange = (index) => {
    const { total, perPage } = this.state;
    const countPages = Math.ceil(total / perPage);

    if (index >= 0 && index < countPages) {
      this.setState({
        activePage: index,
        firstPostOnPage: index * perPage + 1,
        lastPostOnPage: (index === countPages - 1)
          ? total
          : (index + 1) * perPage,
      });
    }
  }

  handlePerPage = (event) => {
    this.setState({
      perPage: event.target.value,
      firstPostOnPage: 1,
      lastPostOnPage: event.target.value,
      activePage: 0,
    });
  }

  render() {
    const {
      total,
      perPage,
      activePage,
      firstPostOnPage,
      lastPostOnPage,
    } = this.state;

    return (
      <div className="App">
        <Pagination
          total={total}
          perPage={perPage}
          activePage={activePage}
          firstPostOnPage={firstPostOnPage}
          lastPostOnPage={lastPostOnPage}
          onPageChange={this.onPageChange}
          handlePerPage={this.handlePerPage}
        />
      </div>
    );
  }
}

export default App;
