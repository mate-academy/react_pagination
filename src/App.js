import React from 'react';
import Pagination from './components/Pagination';
import './App.css';

const App = () => (
  <Pagination
    total={42}
    perPage={5}
    page={1}
  />
);

export default App;
