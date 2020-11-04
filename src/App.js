import React from 'react';
import './App.css';
import { Pagination } from './components/Pagination';
import { Select } from './components/Select';

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

  onPerPageChange = (event) => {
    const { value } = event.target;

    this.setState({
      perPage: +value,
    });
  }

  render() {
    const { total, perPage, pageSelected } = this.state;

    return (
      <div className="app">
        <Select onChange={this.onPerPageChange} />

        <Pagination
          total={total}
          perPage={perPage}
          pageSelected={pageSelected}
          onPageChange={this.onPageChange}
          clickPrevious={this.clickPrevious}
          clickNext={this.clickNext}
          withInfo="true"
        />
      </div>
    );
  }
}

export default App;
