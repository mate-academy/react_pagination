import React from 'react';
import './App.css';
import 'bulma/css/bulma.css';
import { Pagination } from './components/Pagination/Pagination';

class App extends React.PureComponent {
  state = {
    currentPage: 1,
  }

  onPageChange = (page) => {
    this.setState({
      currentPage: page,
    });
  }

  nextPage = () => {
    this.setState(state => ({
      currentPage: state.currentPage + 1,
    }));
  }

  prevPage = () => {
    this.setState(state => ({
      currentPage: state.currentPage - 1,
    }));
  }

  render() {
    const { currentPage } = this.state;

    return (
      <Pagination
        total={42}
        perPage={5}
        page={currentPage}
        onPage={this.onPageChange}
        onPrev={this.prevPage}
        onNext={this.nextPage}
        withInfo
      />
    );
  }
}

export default App;
