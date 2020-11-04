import React from 'react';
import './App.css';
import { Pagination } from './components/Pagination';

class App extends React.PureComponent {
  state = {
    total: 42,
    perPage: 5,
    pageSelected: 1,
  }

  onPageChange = (number) => {
    this.setState({
      pageSelected: number,
    });
  }

  clickPrevious = () => {
    if (this.state.pageSelected === 1) {
      return;
    }

    this.setState(prevState => ({
      pageSelected: prevState.pageSelected - 1,
    }));
  }

  clickNext = () => {
    const { total, perPage, pageSelected } = this.state;

    if (pageSelected === Math.ceil(total / perPage)) {
      return;
    }

    this.setState(prevState => ({
      pageSelected: prevState.pageSelected + 1,
    }));
  }

  render() {
    const { total, perPage, pageSelected } = this.state;

    return (
      <Pagination
        total={total}
        perPage={perPage}
        pageSelected={pageSelected}
        onPageChange={this.onPageChange}
        clickPrevious={this.clickPrevious}
        clickNext={this.clickNext}
        withInfo="true"
      />
    );
  }
}

export default App;
