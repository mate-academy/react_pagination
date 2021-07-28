import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import { Route, Switch } from 'react-router-dom';

import { Page } from './Page';
import { Pagination } from './Pagination';
import { Form } from './Form';

const App = () => (
  <div className="App">
    <Switch>
      <Route path="/:page">
        <Page />
        <Pagination />
      </Route>

      <h1 className="alert alert-danger">
        Not found
      </h1>
    </Switch>
    <Form />
  </div>
);

export default App;
