import React, { useState } from 'react';

import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42)
  .map(n => `Item ${n}`);

export const App: React.FC = () => {
  const total = 42;
  const [perPage, setPerPage] = useState(5);
  const [curPage, setCurPage] = useState(1);
  const startValue = perPage * curPage - (perPage - 1);
  const endValue = perPage * curPage <= total
    ? perPage * curPage
    : total;

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${curPage} (items ${startValue} - ${endValue} of ${total})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            onChange={(event) => {
              setPerPage(+event.target.value);
              setCurPage(1);
            }}
          >
            <option value="3">3</option>
            <option value="5" selected>5</option>
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
        currentPage={curPage}
        onPageChange={(page: number) => {
          setCurPage(page);
        }}
      />

      <ul>
        {[...items.slice(startValue - 1, endValue)]
          .map(item => (
            <li
              data-cy="item"
              key={item}
            >
              {item}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default App;
