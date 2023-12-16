import React, { useState } from 'react';

import { Pagination } from './components/Pagination';
import { getNumbers, getCurrentItems } from './utils';
import { DEFAULT_PAGE } from './constants';

import './App.css';

const items = getNumbers(1, 42)
  .map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [page, setPage] = useState(DEFAULT_PAGE);
  const [perPage, setPerPage] = useState(5);

  const startIndex = perPage * (page - 1);
  const lastItemNumber = startIndex + perPage < items.length
    ? startIndex + perPage
    : items.length;

  const handleSelector = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setPerPage(+event.target.value);
    setPage(DEFAULT_PAGE);
  };

  const handlePageChange = (selectedPage: number) => {
    setPage(selectedPage);
  };

  const currentItems = getCurrentItems(items, page, perPage, startIndex);

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${page} (items ${startIndex + 1} - ${lastItemNumber} of ${items.length})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={perPage}
            onChange={handleSelector}
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
        perPage={perPage}
        currentPage={page}
        onPageChange={handlePageChange}
      />

      <ul>
        {currentItems.map(item => (
          <li
            data-cy="item"
            key={item}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
