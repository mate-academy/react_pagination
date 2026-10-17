import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const totalItems = 42;
const items = getNumbers(1, totalItems).map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(5);

  const fromItem = (page - 1) * perPage;
  const toItem = Math.min(fromItem + perPage - 1, totalItems - 1);
  const currentItemsIndex = getNumbers(fromItem, toItem);

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        Page {page} (items {fromItem + 1} - {toItem + 1} of {totalItems})
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={perPage}
            onChange={event => {
              setPerPage(+event.target.value);
              setPage(1);
            }}
          >
            <option value="3">3</option>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
          </select>
        </div>

        <label htmlFor="perPageSelector" className="col-form-label col">
          items per page
        </label>
      </div>

      <Pagination
        total={totalItems}
        perPage={perPage}
        currentPage={page}
        onPageChange={setPage}
      />

      <ul>
        {currentItemsIndex.map(index => (
          <li key={index} data-cy="item">
            {items[index]}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
