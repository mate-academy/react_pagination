import React from 'react';
import { Pagination } from './components/Pagination';
import { AppContent } from './components/AppContent';
import './App.css';

const serverDataUrl = 'https://jsonplaceholder.typicode.com/posts';

class App extends React.Component {
  state = {
    isLoading: true,
    data: [],
    currentPage: 1,
    perPage: 5,
    maxSize: 42,
  }

  componentDidMount() {
    fetch(serverDataUrl)
      .then(responese => responese.json())
      .then((result) => {
        this.setState(prevState => ({
          data: [...prevState.data, ...result.slice(0, prevState.maxSize)],
          isLoading: false,
        }));
      });
  }

  onPageChange = (newPage) => {
    this.setState({
      currentPage: newPage,
    });
  }

  onPerPageChange = (newPerPage) => {
    this.setState({
      currentPage: 1,
      perPage: newPerPage,
    });
  }

  render() {
    const { data, currentPage, perPage, maxSize } = this.state;

    return (
      <div>
        <h1 className="display-3 text-center">Pagination</h1>

        {
          this.state.isLoading
            ? <h1>Loading...</h1>
            : (
              <AppContent
                data={data}
                currentPage={currentPage - 1}
                perPage={perPage}
              />
            )
        }
        <Pagination
          total={maxSize}
          perPage={perPage}
          page={currentPage}
          onPageChange={this.onPageChange}
          onPerPageChange={this.onPerPageChange}
        />
      </div>
    );
  }
}

export default App;
