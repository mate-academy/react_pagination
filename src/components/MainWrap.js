import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import '../App.css';
import Pagination from './Pagination';

const MainWrap = ({
  total,
  perPage,
  activePage,
  handlePerPage,
}) => (
  <Switch>
    <Route
      path="/"
      exact
      render={() => (
        <div>
          Home pages
        </div>
      )}
    />

    <Route
      path="/posts/:activePage?"
      render={() => (
        <Pagination
          total={total}
          perPage={perPage}
          activePage={activePage}
          handlePerPage={handlePerPage}
        />
      )}
    />
  </Switch>
);

MainWrap.propTypes = {
  total: PropTypes.number.isRequired,
  perPage: PropTypes.number.isRequired,
  activePage: PropTypes.number.isRequired,
  handlePerPage: PropTypes.func.isRequired,
};

export default MainWrap;
