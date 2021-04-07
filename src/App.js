import React, { useState } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import './App.css';
import { Content } from './Content/Content';
import { Pagination } from './Pagination/Pagination';

const state = {
  total: 42,
  perPage: 5,
  page: 1,
  paginChanged: false,
};

export const App = () => {
  const [pagination, setPagination] = useState(state);
  const { page, paginChanged } = pagination;
  const onPerPageChange = (e) => {
    setPagination({
      ...pagination,
      perPage: e.target.value,
      page: 1,
    });
  };

  const onChangePage = (item) => {
    setPagination({
      ...pagination, page: item,
    });
  };

  const onClickPrev = () => {
    setPagination({
      ...pagination, page: page - 1,
    });
  };

  const onClickNext = () => {
    setPagination({
      ...pagination, page: page + 1,
    });
  };

  const onChangePagination = () => {
    setPagination({
      ...pagination,
      paginChanged: !paginChanged,
      page: 1,
    });
  };

  return (
    <Switch>
      <Route path="/pagination">
        <h1>Pagination</h1>
        <Content pagination={pagination} />
        <Pagination
          pagination={pagination}
          onChangePage={onChangePage}
          onClickPrev={onClickPrev}
          onClickNext={onClickNext}
          onChangePerPage={onPerPageChange}
          onChangePagination={onChangePagination}
        />
      </Route>
      <Redirect path="/" to="/pagination?perPage=5&page=1" />

    </Switch>
  );
};
