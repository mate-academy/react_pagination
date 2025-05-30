import React from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';
import { useState } from 'react';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42).map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPerPage, setPerPage] = useState(5);

  const startItem = (currentPage - 1) * currentPerPage;
  const endItem = startItem + currentPerPage;
  const visibleItems = items.slice(startItem, endItem);

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        Page {currentPage} (items{' '}
        {startItem + 1 + ' - ' + Math.min(endItem, items.length)} of 42)
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
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
        perPage={currentPerPage} // number of items per page
        currentPage={currentPage} /* optional with 1 by default */
        onPageChange={page => {
          setCurrentPage(page);
        }}
        items={visibleItems}
      />
    </div>
  );
};

export default App;
