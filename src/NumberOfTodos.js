import React from 'react';
import propTypes from 'prop-types';

const NumberOfTodos = ({
  todosOfVisiblePage,
  numberTodos,
  perPage,
  changePerPage,
}) => (
  <div className="page-header">
    <h1>List of todos</h1>
    <div className="page-header__info">
      <p>
        {
          `${todosOfVisiblePage.content[0].id}
          - ${todosOfVisiblePage.content
    [todosOfVisiblePage.content.length - 1].id}
          from ${numberTodos}`
        }
      </p>
    </div>
    <div className="page-header__change">
      <label htmlFor="changePage">
        Number of todos
        <select
          className="page-header__change-number"
          id="changerPage"
          value={perPage}
          onChange={changePerPage}
        >
          <option value="3">3</option>
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
        </select>
      </label>
    </div>
  </div>
);

NumberOfTodos.propTypes = {
  todosOfVisiblePage: propTypes.shape().isRequired,
  numberTodos: propTypes.number.isRequired,
  perPage: propTypes.number.isRequired,
  changePerPage: propTypes.func.isRequired,
};

export default NumberOfTodos;
