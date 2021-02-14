import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import { Pagination } from './Pagination';

const contentFromServer = Array(42).fill(0).map((el, i) => el + i + 1); // 1-42

class App extends React.Component {
  state = {
    contentParts: contentFromServer.length,
    contentPerPage: 5,
    selectedPage: 1,
  }

  onPageChange = (newPage) => {
    this.setState({ selectedPage: newPage });
  }

  onPerPageChange = ({ target }) => {
    this.setState({
      contentPerPage: +target.value, selectedPage: 1,
    });
  }

  findElementsToShow = () => {
    const { contentParts, contentPerPage, selectedPage } = this.state;
    const result = [];

    for (let i = 0; i < contentParts; i += contentPerPage) {
      result.push(contentFromServer.slice(i, i + contentPerPage));
    }

    return result[selectedPage - 1];
  }

  render() {
    const { contentParts, contentPerPage, selectedPage } = this.state;
    const firstElemToShow = this.findElementsToShow()[0];
    const lastElemToShow = this.findElementsToShow()[contentPerPage - 1];

    return (
      <>
        <h1>Pagination</h1>
        {`Showed elements
         ${firstElemToShow} - ${lastElemToShow} 
         of ${contentParts}`}
        <Pagination
          onPageChange={this.onPageChange}
          onPerPageChange={this.onPerPageChange}
          total={contentParts}
          perPage={contentPerPage}
          currentPage={selectedPage}
        />
      </>
    );
  }
}

export default App;
