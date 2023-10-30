/* eslint-disable react/button-has-type */
import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import Pagination from './components/Pagination/Pagination';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42)
  .map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);

  const getPages = (pages: number = page, limits: number = limit): string[] => {
    const array = [];

    // eslint-disable-next-line no-plusplus
    for (let i = (pages - 1) * limits; i < (pages * limits); i++) {
      array.push(items[i]);
    }

    return array;
  };

  const INFO_OF_PAGE = `Page ${page} (items ${(page - 1) * limit + 1} - ${Math.min(page * limit, items.length)} of ${items.length})`;

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {INFO_OF_PAGE}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            defaultValue="5"
            onChange={(event) => setLimit(Number(event.target.value))}
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
        currentPage={page}
        perPage={limit}
        total={items.length}
        onPageChange={setPage}
      />
      <ul>
        {getPages(page, limit).map((item, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <li key={index} data-cy="item">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
