import React, { useState } from 'react';
import './App.css';
import { Pagination } from './components/Pagination';
import { getNumbers } from './utils';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items: string[] = getNumbers(0, 42).map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [perPage, changePerPage] = useState(5);
  const [currentPage, changeCurrentPage] = useState(1);
  const startsWith = perPage * currentPage - (perPage - 1);
  const total = 42;
  let ends = perPage * currentPage;

  if (ends > total) {
    ends = total;
  }

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        Page {currentPage} (items {startsWith} - {ends} of {total})
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            onChange={e => {
              changeCurrentPage(1);
              changePerPage(+e.target.value);
            }}
          >
            <option value="3">3</option>
            <option value="5" selected>
              5
            </option>
            <option value="10">10</option>
            <option value="20">20</option>
          </select>
        </div>

        <label htmlFor="perPageSelector" className="col-form-label col">
          items per page
        </label>
      </div>

      <Pagination
        total={total}
        perPage={perPage}
        currentPage={currentPage}
        onPageChange={page => {
          changeCurrentPage(page);
        }}
      />

      <ul>
        {[...items].splice(startsWith, perPage).map((item, index) => {
          return (
            <li data-cy="item" key={index}>
              {item}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default App;
