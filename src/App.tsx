import React from 'react';
import './App.scss';
import { Pagination } from './components/pagination/pagination';

const App: React.FC = () => (
  <div className="app">
    <h1>Pagination</h1>
    <Pagination />
  </div>
);

export default App;
