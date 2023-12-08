import React, { useState } from 'react';
import './App.css';

import { Pagination } from './components/Pagination';
import { getNumbers } from './utils';

const TOTAL = 42;
const PER_PAGE_OPTIONS = [3, 5, 10, 20];

const items = getNumbers(1, 42)
  .map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [perPage, setPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  const startItem = (currentPage - 1) * perPage + 1;
  const endItem = Math.min(currentPage * perPage, TOTAL);

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPerPage(+event.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${startItem} - ${endItem} of 42)`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            onChange={handleSelect}
            value={perPage}
          >
            {PER_PAGE_OPTIONS.map(option => (
              <option value={option}>{option}</option>
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
        onPageChange={(page) => setCurrentPage(page)}
      />
      <ul>
        {items.map((item, index) => {
          return index >= startItem - 1 && index <= endItem - 1 ? (
            <li key={item} data-cy="item">
              {item}
            </li>
          ) : null;
        })}

      </ul>
    </div>
  );
};

export default App;
