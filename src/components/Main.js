import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import PageWithPagination from './PageWithPagination';

const Main = () => (
  <>
    <Switch>
      <Route path="/pages/:perPage/:page" component={PageWithPagination} />
      <Redirect from="/" to="/pages/3/1" />
    </Switch>
  </>
);

export default Main;
