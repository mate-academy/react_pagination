import React from 'react';
import './App.css';
import PaginationWithContent from './components/Pagination/Pagination';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <PaginationWithContent total={42} perPage={5} page={5} />
      </div>
    );
  }
}

export default App;
