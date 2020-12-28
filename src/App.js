import React, { useState } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import './App.css';
import { Pagination } from './Pagination/Pagination';

const state = {
  total: 42,
  perPage: 5,
  page: 1,
  option: false,
};

export const App = () => {
  const [pagin, setPagin] = useState(state);
  const { page, option } = pagin;
  const onPerPageChange = (e) => {
    setPagin({
      ...pagin,
      perPage: e.target.value,
      page: 1,
    });
  };

  const onChangePage = (item) => {
    setPagin({
      ...pagin, page: item,
    });
  };

  const onClickPrev = () => {
    setPagin({
      ...pagin, page: page - 1,
    });
  };

  const onClickNext = () => {
    setPagin({
      ...pagin, page: page + 1,
    });
  };

  const onClickOption = () => {
    setPagin({
      ...pagin, option: !option, page: 1,
    });
  };

  return (
    <Switch>
      <Route path="/pagination">
        <h1>Pagination</h1>
        <Pagination
          pagin={pagin}
          onChangePage={onChangePage}
          onClickPrev={onClickPrev}
          onClickNext={onClickNext}
          onChangePerPage={onPerPageChange}
          onClickOption={onClickOption}
        />
      </Route>
      <Redirect path="/" to="/pagination?perPage=5&page=1" />
    </Switch>
  );
};
