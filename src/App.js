import React from 'react';
import { Pagination } from './components/Pagination/Pagination';
import './App.css';

const App = () => (
  <Pagination
    total={42}
    page={5}
    perPage={4}
  />
);

export default App;
