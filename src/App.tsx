import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42).map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(5);

  const itemStartOnNextPage = currentPage * itemsPerPage - itemsPerPage + 1;
  const lastItemOnPage = Math.min(items.length, currentPage * itemsPerPage);

  const visibleItems = getNumbers(itemStartOnNextPage, lastItemOnPage);

  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  const onItemsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value: number = parseInt(e.target.value, 10);

    setItemsPerPage(value);
    setCurrentPage(1);
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        Page {currentPage} (items {itemStartOnNextPage} - {lastItemOnPage} of
        42)
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            value={itemsPerPage}
            onChange={onItemsPerPageChange}
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
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
        total={items.length}
        perPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={onPageChange}
      />

      <ul>
        {visibleItems.map((item, index) => {
          return (
            <li key={index} data-cy="item">
              Item {item}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default App;
