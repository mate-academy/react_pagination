import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42).map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [pagination, setPagination] = useState({
    perPage: 5,
    currentPage: 1,
  });
  const totalItemsCount = items.length;
  const perPageOptions = [3, 5, 10, 20];
  const itemsStartIndex = (pagination.currentPage - 1) * pagination.perPage;
  const itemsEndIndex = Math.min(
    itemsStartIndex + pagination.perPage,
    totalItemsCount,
  );

  const handlePageChange = (page: number) => {
    setPagination({ ...pagination, currentPage: page });
  };

  const handleSelectPerPage = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPagination({
      currentPage: 1,
      perPage: parseInt(e.target.value, 10),
    });
  };

  const showPaginatedItems = () => {
    return items.slice(itemsStartIndex, itemsEndIndex).map(item => (
      <li key={item} data-cy="item">
        {item}
      </li>
    ));
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        Page {pagination.currentPage} (items {itemsStartIndex + 1} -{' '}
        {itemsEndIndex} of {totalItemsCount})
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={pagination.perPage}
            onChange={handleSelectPerPage}
          >
            {perPageOptions.map(n => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </div>

        <label htmlFor="perPageSelector" className="col-form-label col">
          items per page
        </label>
      </div>

      <Pagination
        total={totalItemsCount}
        perPage={pagination.perPage}
        currentPage={pagination.currentPage}
        onPageChange={handlePageChange}
      />

      <ul>{showPaginatedItems()}</ul>
    </div>
  );
};

export default App;
