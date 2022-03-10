import React from 'react';
import './App.css';
import Pagination from './Components/Pagination';

const App: React.FC = () => {
  return (
    <div className="app">
      <h1 className="title">Pagination</h1>
      <Pagination />
    </div>
  );
};

export default App;
