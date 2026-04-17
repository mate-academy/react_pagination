import React, { useState } from 'react';
import './App.css';
import { Pagination } from './components/Pagination';
import { getNumbers } from './utils';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items: string[] = getNumbers(0, 42).map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [perPage, changePerPage] = useState(5);
  const [currentPage, changeCurrentPage] = useState(1);
  const startIndex = (currentPage - 1) * perPage;
  const nowItems = items.slice(startIndex + 1, startIndex + 1 + perPage);
  const total = 42;
  let ends = perPage * currentPage;

  if (ends > total) {
    ends = total;
  }

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        Page {currentPage} (items {startIndex + 1} - {ends} of {total})
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            value={perPage}
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            onChange={e => {
              changeCurrentPage(1);
              changePerPage(+e.target.value);
            }}
          >
            <option value="3">3</option>
            <option value="5"> 5 </option>
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
        {nowItems.map(item => {
          return (
            <li data-cy="item" key={item}>
              {item}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default App;
