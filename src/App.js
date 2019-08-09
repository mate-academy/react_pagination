import React from 'react';
import './App.css';
import Pagination from './components/Pagination';

class App extends React.Component {
  state = {
    total: 42,
    perPage: 5,
    activePage: 1,
  };

  onPageChange = (nexPage) => {
    const { total, perPage } = this.state;
    const countPages = Math.ceil(total / perPage);

    if (nexPage >= 1 && nexPage <= countPages) {
      this.setState({
        activePage: nexPage,
      });
    }
  }

  handlePerPage = (event) => {
    this.setState({
      perPage: event.target.value,
      activePage: 1,
    });
  }

  render() {
    const {
      total,
      perPage,
      activePage,
    } = this.state;

    return (
      <div className="App">
        <Pagination
          total={total}
          perPage={perPage}
          activePage={activePage}
          onPageChange={this.onPageChange}
          handlePerPage={this.handlePerPage}
        />
      </div>
    );
  }
}

export default App;
