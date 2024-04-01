import React, { useState } from 'react';
import './App.css';

import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42).map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [perPage, setPerPage] = useState<number>(5);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const pagiTotal = 42;

  const firstItem = (currentPage - 1) * perPage + 1;
  const lastItem = Math.min(currentPage * perPage, items.length);

  const startIndx = (currentPage - 1) * perPage;
  const endIndx = startIndx + perPage;

  const onPageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const onPerPageChange = (newPerPage: number) => {
    setPerPage(newPerPage);
    setCurrentPage(1);
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        Page {currentPage} (items {firstItem} - {lastItem} of {items.length})
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            onChange={(e) => onPerPageChange(Number(e.target.value))}
            value={perPage}
          >
            {[3, 5, 10, 20].map(num => (
              <option value={num}>{num}</option>
            ))}
          </select>
        </div>

        <label htmlFor="perPageSelector" className="col-form-label col">
          items per page
        </label>
      </div>

      {/* Move this markup to Pagination */}
      <Pagination
        total={pagiTotal}
        perPage={perPage}
        currentPage={currentPage}
        onPageChange={onPageChange}
      />
      <ul>
        {items
          .slice(startIndx, endIndx)
          .map((item, i) => (
          <li data-cy="item" key={i}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
