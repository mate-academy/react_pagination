import React from 'react';
import './App.css';
import Pagination from './Pagination/Pagination';

const App: React.FC = () => {
  return (
    <>
      <h1>Pagination</h1>
      <Pagination total={42} perPage={5} page={1} />
    </>
  );
};

export default App;
