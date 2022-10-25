import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';

import { Pagination } from './components/Pagination';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42)
  .map(n => `Item ${n}`);

const perPageOptions: number[] = [3, 5, 10, 20];

export const App: React.FC = () => {
  const [total] = useState(items.length);
  const [perPage, setPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(0);

  const pageChange = (page: number) => {
    setCurrentPage(page);
  };

  const lastItemonPage = (currentPage * perPage) + perPage < total
    ? (currentPage * perPage) + perPage
    : total;

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage + 1} (items ${
          currentPage * perPage + 1} - ${lastItemonPage} of ${total})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            value={perPage}
            className="form-control"
            onChange={(e) => {
              setPerPage(+e.target.value);
              setCurrentPage(0);
            }}
          >
            {perPageOptions.map(option => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <label htmlFor="perPageSelector" className="col-form-label col">
          items per page
        </label>
      </div>

      {/* Move this markup to Pagination */}
      <Pagination
        total={total}
        perPage={perPage}
        currentPage={currentPage}
        onPageChange={pageChange}
      />
    </div>
  );
};

export default App;
