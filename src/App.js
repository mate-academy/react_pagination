import React from 'react';
import './App.css';
import { Pagination } from './components/Pagination';

const App = () => (
  <>
    <h1>Pagination</h1>
    <Pagination
      total={42}
      perPage={5}
      page={1}
      withInf0={false}
    />
  </>
);

export default App;
