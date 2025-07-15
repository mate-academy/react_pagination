import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42).map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(5);

  function onPageChange(page: number) {
    setCurrentPage(page);
  }

  const startIndex = (currentPage - 1) * perPage;
  const endIndex = Math.min(startIndex + perPage, items.length);
  const visibleItems = items.slice(startIndex, endIndex);

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        Page {currentPage} (items {startIndex + 1} - {endIndex} of 42)
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={perPage}
            onChange={e => {
              setPerPage(Number(e.target.value));
              setCurrentPage(1);
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
        total={42} // total number of items to paginate
        perPage={perPage} // number of items per page
        currentPage={currentPage} /* optional with 1 by default */
        onPageChange={onPageChange}
      />

      <ul>
        {visibleItems.map(n => {
          return (
            <li key={n} data-cy="item">
              {n}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default App;
