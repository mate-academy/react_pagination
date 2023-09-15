/* eslint-disable no-console */
import React, { useState } from 'react';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';
import './App.css';

const ITEMS_PER_PAGE_OPTIONS = [3, 5, 10, 20];

const generateItems = () => {
  return getNumbers(1, 42).map(n => `Item ${n}`);
};

export const App: React.FC = () => {
  const [perPage, setPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  // Move the 'items' declaration above the 'total' calculation
  const items = generateItems();
  const total = items.length;

  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  const onPerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPerPage(+event.target.value);
  };

  const calculateFirstItemIndex = () => {
    return ((currentPage - 1) * perPage) + 1;
  };

  const calculateLastItemIndex = () => {
    return Math.min(currentPage * perPage, total);
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${calculateFirstItemIndex()} - ${calculateLastItemIndex()} of ${total})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            onChange={onPerPageChange}
            value={perPage}
          >
            {ITEMS_PER_PAGE_OPTIONS.map(option => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <label htmlFor="perPageSelector" className="col-form-label col">
          items per page
        </label>
      </div>

      <Pagination
        total={+total}
        perPage={+perPage}
        currentPage={+currentPage}
        onPageChange={onPageChange}
        items={items}
      />
    </div>
  );
};
