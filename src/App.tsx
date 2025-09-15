/* eslint no-console: ["error", { allow: ["warn", "log"] }] */
import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

const TOTAL_ITEMS: number = 42;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, TOTAL_ITEMS).map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [perPage, setPerPage] = useState<number>(5);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const onPageChange = (page: number) => {
    if (page === currentPage) {
      return;
    }

    setCurrentPage(page);
  };

  const startIndex = TOTAL_ITEMS === 0 ? 0 : (currentPage - 1) * perPage + 1;
  const endIndex = Math.min(currentPage * perPage, TOTAL_ITEMS);

  const currentItems = items.slice(startIndex - 1, endIndex);

  return (
    <div className="container">
      <h1>Items with Pagination</h1>
      <p className="lead" data-cy="info">
        Page {currentPage} (items {startIndex} - {endIndex} of {TOTAL_ITEMS})
      </p>
      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            onChange={event => {
              setPerPage(+event.target.value);
              setCurrentPage(1);
            }}
            value={perPage}
          >
            <option value={3}>3</option>
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
          </select>
        </div>

        <label htmlFor="perPageSelector" className="col-form-label col">
          items per page
        </label>
      </div>
      <Pagination
        total={TOTAL_ITEMS}
        perPage={perPage}
        currentPage={currentPage}
        onPageChange={onPageChange}
      />
      <ul>
        {currentItems.map(item => (
          <li data-cy="item" key={item}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
