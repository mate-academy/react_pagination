import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import { Redirect, Route, Switch } from 'react-router-dom';
import { useRouteMatch } from 'react-router';

import { Page } from './Page';
import { Pagination } from './Pagination';
import { Form } from './Form';

const App = () => {
  const match = useRouteMatch('/:page');

  return (
    <div className="App">
      <Switch>
        {!match?.params?.page && <Redirect to="/1?total=42&perPage=5" />}

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
};

export default App;
