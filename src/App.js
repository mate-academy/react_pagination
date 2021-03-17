import React from 'react';
import { Pagination } from './Pagination/Pagination';
import './App.css';

class App extends React.PureComponent {
  state = {
    selectedPage: 1,
  }

  onPageChange = (page) => {
    this.setState({ selectedPage: page });
  }

  nextPageHandler = (pagesQuantity) => {
    this.setState((prevState) => {
      if (prevState.selectedPage === pagesQuantity) {
        return 0;
      }

      return {
        selectedPage: prevState.selectedPage + 1,
      };
    });
  }

  prevPageHandler = () => {
    this.setState((prevState) => {
      if (prevState.selectedPage === 1) {
        return 0;
      }

      return {
        selectedPage: prevState.selectedPage - 1,
      };
    });
  }

  render() {
    const { selectedPage } = this.state;

    return (
      <>
        <h1>Pagination</h1>
        <nav aria-label="Page navigation example">
          <Pagination
            total={42}
            perPage={5}
            page={selectedPage}
            handlerPage={this.onPageChange}
            prevPageHandler={this.prevPageHandler}
            nextPageHandler={this.nextPageHandler}
            withInfo
          />
        </nav>
      </>
    );
  }
}

export default App;
