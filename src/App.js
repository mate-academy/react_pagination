import React from 'react';
import './App.css';
import { Pagination } from './components/Pagination';

const options = [3, 5, 10, 20];

class App extends React.Component {
  state = {
    perPage: 5,
  }

  onPerPageChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    });
  }

  render() {
    const { perPage } = this.state;

    return (
      <div className="App">
        <h1>Pagination</h1>
        <Pagination
          total={42}
          perPage={perPage}
          page={1}
          withInfo="Hello, I`m additional info"
        />
        <select
          name="perPage"
          value={perPage}
          onChange={this.onPerPageChange}
        >
          {options.map(item => (
            <option
              key={item}
              value={item}
            >
              {item}
            </option>
          ))}
        </select>
      </div>
    );
  }
}

export default App;
