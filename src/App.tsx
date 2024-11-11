import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

// eslint-disable-next-line @typescript-eslint/no-unused-vars

export const App: React.FC = () => {
  const items = getNumbers(1, 42).map(n => `Item ${n}`);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(5);
  const first = currentPage * perPage - perPage + 1;
  const last = Math.min(items.length, currentPage * perPage);
  const visibleItems = getNumbers(first, last);

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        Page {currentPage} {`(items ${first} - ${last} of 42)`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={perPage}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
              setPerPage(+e.target.value);
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
        onPageChange={page => setCurrentPage(page)}
      />

      <ul>
        {visibleItems.map(number => (
          <li data-cy="item" key={number}>{`Item ${number}`}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
