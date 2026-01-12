import React, { useState } from 'react';
import './App.css';
import { getNumbers, toPerPage } from './utils';
import { PerPage } from './types/PerPage';
import { Pagination } from './components/Pagination';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const TOTAL = 42;
const items = getNumbers(1, TOTAL).map(n => `Item ${n}`);

const selectOption: PerPage = 5;

export const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState<PerPage>(selectOption);

  const startItem = (currentPage - 1) * perPage;
  const entItem = Math.min(items.length, currentPage * perPage);
  const itemsForDisplay = [...items].slice(startItem, entItem);

  const onPageChange = (page: number) => setCurrentPage(page);

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        Page {currentPage} (items {startItem + 1} - {entItem} of 42)
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            value={perPage}
            className="form-control"
            onChange={event => {
              setCurrentPage(1);
              setPerPage(toPerPage(event.target.value));
            }}
          >
            {[3, 5, 10, 20].map(count => (
              <option key={count} value={`${count}`}>
                {count}
              </option>
            ))}
          </select>
        </div>

        <label htmlFor="perPageSelector" className="col-form-label col">
          items per page
        </label>
      </div>

      <Pagination
        total={TOTAL}
        perPage={perPage}
        currentPage={currentPage}
        onPageChange={onPageChange}
      />

      <ul>
        {itemsForDisplay.map(item => (
          <li key={item} data-cy="item">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
