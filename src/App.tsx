import React, { useState } from 'react';

import './App.css';
import { Pagination } from './components/Pagination/';
import { getNumbers } from './utils';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const items = getNumbers(1, 42).map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const totalItems = items.length;
  const firstItem = (currentPage - 1) * perPage;
  const lastItem =
    currentPage * perPage <= totalItems ? currentPage * perPage : totalItems;

  const handlePerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;

    setPerPage(Number(value));
    setCurrentPage(1);
  };

  const handlePageChange = (newPage: number) => setCurrentPage(newPage);

  const itemsRendering = () => {
    return [...items]
      .map((item, index) => (
        <li data-cy="item" key={index}>
          {item}
        </li>
      ))
      .slice(firstItem, lastItem);
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        Page {currentPage} (items {firstItem + 1} - {lastItem} of {totalItems})
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={perPage}
            onChange={handlePerPageChange}
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
        currentPage={currentPage}
        onPageChange={page => handlePageChange(page)}
      />

      <ul>{itemsRendering()}</ul>
    </div>
  );
};

export default App;
