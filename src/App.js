import React from 'react';
import './App.css';
import { HashRouter, Route } from 'react-router-dom';
import { ConnectedPagination } from './components/ConnectedPagination';

const App = () => (
  <div className="App text-center">
    <h1 className="mb-5">Pagination</h1>
    <HashRouter>
      <Route path="/" component={ConnectedPagination} />
    </HashRouter>
    <p className="pt-5">Try change url</p>
  </div>
);

export default App;
