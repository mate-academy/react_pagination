import React from 'react';
import { Pagination } from './Pagination/Pagination';
import './App.css';

class App extends React.PureComponent {
  render() {
    return (
      <>
        <h1>Pagination</h1>
        <nav aria-label="Page navigation example">
          <Pagination
            total={42}
            perPage={5}
            withInfo
          />
        </nav>
      </>
    );
  }
}

export default App;
