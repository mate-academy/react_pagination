import React from 'react';
import './App.scss';
import Pagination from './Pagination';

class App extends React.Component {
  state = {
    tableData: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k'],
  };

  render() {
    return (
      <div className="App">
        <h1>Pagination</h1>
        <Pagination
          tableData={this.state.tableData} /* required */
          perPage={5} /* optional with 5 by default */
          page={1} /* optional with 1 by default */
          withInfo
        />
      </div>
    );
  }
}

export default App;
