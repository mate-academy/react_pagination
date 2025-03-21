import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42).map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [defaultItemValue, setDefaultItemValue] = useState<number>(5);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [maxValue] = useState<number>(42);

  const firstIndex = (currentPage - 1) * defaultItemValue;
  const lastIndex = firstIndex + defaultItemValue;
  const currentItems = items.slice(firstIndex, lastIndex);

  const handlePerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setDefaultItemValue(Number(event.target.value));
    setCurrentPage(1);
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        Page {currentPage} (items {firstIndex + 1} -{' '}
        {Math.min(lastIndex, maxValue)} of 42)
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            onChange={handlePerPageChange}
            value={defaultItemValue}
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
        total={maxValue}
        perPage={defaultItemValue}
        currentPage={currentPage}
        onPageChange={page => {
          setCurrentPage(page);
        }}
      />
      <ul>
        {currentItems.map(item => (
          <li key={item} data-cy="item">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
