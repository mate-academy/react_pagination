import React, { useState } from 'react';
import './App.css';

import { items, ALL_OPTIONS } from './constants/constants';
import { v4 as uuidv4 } from 'uuid';
import { Pagination } from './components/Pagination';

export const App: React.FC = () => {
  const [perPage, setPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  const startPageItem = (currentPage - 1) * perPage + 1;
  const endPageItem = Math.min(currentPage * perPage, items.length);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  const displayedItems = items.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage,
  );

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        Page {currentPage} (items {startPageItem} - {endPageItem} of{' '}
        {items.length})
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
            {ALL_OPTIONS.map((number: number) => {
              return (
                <option key={uuidv4()} value={number}>
                  {number}
                </option>
              );
            })}
          </select>
        </div>

        <label htmlFor="perPageSelector" className="col-form-label col">
          items per page
        </label>
      </div>
      <Pagination
        total={items.length}
        perPage={perPage}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
      <ul>
        {displayedItems.map((item: string) => {
          return (
            <li key={uuidv4()} data-cy="item">
              {item}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default App;
