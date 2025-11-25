import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

const TOTAL_PAGES = 42;

export const App: React.FC = () => {
  const [perPage, setPerPage] = useState<number>(5);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const fromItem = (currentPage - 1) * perPage + 1;
  const toItem = Math.min(currentPage * perPage, TOTAL_PAGES);
  const items = getNumbers(fromItem, toItem).map(n => `Item ${n}`);

  const handlePerChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPerPage(Number(event.target.value));
    setCurrentPage(1);
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        Page {currentPage} (items {fromItem} - {toItem} of {TOTAL_PAGES})
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            value={perPage}
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            onChange={handlePerChange}
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
        total={TOTAL_PAGES}
        perPage={perPage}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      ></Pagination>
      <ul>
        {items.map((item, index) => (
          <li key={index} data-cy="item">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
