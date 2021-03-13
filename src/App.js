import React from 'react';
import { Pagination } from './Pagination';
import './App.css';

class App extends React.Component {
  state= {

  }

  render() {
    return (
      <>
        <h1>Pagination</h1>
        <Pagination
          total={42}
          perPage={5}
          page={1}
          withInfo="Your advertisement could be here"
        />
      </>
    );
  }
}

export default App;
