import React from 'react';
import './App.css';
import { Pagination } from './components/Pagination';
import { Select } from './components/Select';

const initialState = {
  totalAmountOfItems: 42,
  perPage: 5,
  pageSelected: 1,
};

class App extends React.PureComponent {
  state = initialState;

  onPageChange = (number) => {
    this.setState({
      pageSelected: number,
    });
  }

  clickPrevious = () => {
    if (this.state.pageSelected === initialState.pageSelected) {
      return;
    }

    this.setState(prevState => ({
      pageSelected: prevState.pageSelected - 1,
    }));
  }

  clickNext = () => {
    const { totalAmountOfItems, perPage, pageSelected } = this.state;

    if (pageSelected === Math.ceil(totalAmountOfItems / perPage)) {
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
    const { totalAmountOfItems, perPage, pageSelected } = this.state;

    return (
      <div className="app">
        <Select onChange={this.onPerPageChange} />

        <Pagination
          totalAmountOfItems={totalAmountOfItems}
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
