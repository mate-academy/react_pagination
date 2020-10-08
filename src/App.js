import React from 'react';
import './App.css';
import { Pagination } from './components/Pagination';

class App extends React.Component {
  state = {
    total: 42,
    perPage: 5,
    page: 1,
    arrayOfSelection: [3, 5, 10, 20],
  };

  onPageChange = (numberOfPage) => {
    this.setState({ page: numberOfPage });
  };

  previousPage = () => {
    this.setState(prevState => ({
      page: prevState.page - 1,
    }));
  };

  nextPage = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  onPerPageChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
      page: 1,
    });
  };

  render() {
    const { total, perPage, page, arrayOfSelection } = this.state;

    return (
      <>
        <h1>Pagination</h1>
        <form>
          <select
            name="perPage"
            value={perPage}
            onChange={this.onPerPageChange}
          >
            {arrayOfSelection.map(value => (
              <option
                key={value}
                value={value}
              >
                {value}
              </option>
            ))}
          </select>
        </form>
        <Pagination
          total={total}
          perPage={perPage}
          page={page}
          previousPage={this.previousPage}
          onPageChange={this.onPageChange}
          nextPage={this.nextPage}
        />
      </>
    );
  }
}

export default App;
