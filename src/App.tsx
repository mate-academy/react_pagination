import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42).map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [perPage, setPerPage] = useState<number>(5);
  const [currentPage, setCurrentPage] = useState<number>(1);

  let toCount = currentPage * perPage;
  const fromCount = currentPage * perPage - perPage + 1;

  if (toCount > 42) {
    toCount = 42;
  }

  const itemsPerPage = getNumbers(fromCount, toCount).map(n => `Item ${n}`);

  function handleSelectChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const perPageNew = Number(event.target.value);

    setPerPage(perPageNew);
    setCurrentPage(1);
  }

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        Page {currentPage} (items {fromCount} - {toCount} of 42)
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={perPage}
            onChange={handleSelectChange}
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
        total={42}
        perPage={perPage}
        currentPage={currentPage}
        onPageChange={page => setCurrentPage(page)}
      />

      {itemsPerPage.map(pageItem => {
        return (
          <li data-cy="item" key={pageItem}>
            {pageItem}
          </li>
        );
      })}
    </div>
  );
};

export default App;
