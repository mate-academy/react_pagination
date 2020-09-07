import React from 'react';
import './App.css';

import Pagination from './components/Pagination/Pagination';

const App = () => (
  <>
    <h1>
      Pagi
      <span>nation</span>
    </h1>
    <Pagination
      total={42}
      perPage={5}
      page={1}
    />
  </>
);

export default App;
