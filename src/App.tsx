import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42).map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [curPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(5);

  const handlePageChange = page => {
    setCurrentPage(page);
  };

  const handlePerPageChange = e => {
    setPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  const start = (curPage - 1) * perPage;
  const end = start + perPage;
  const visibleItems = items.slice(start, end);
  const totalItems = items.length;

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        Page {curPage} (items {start + 1} - {Math.min(end, totalItems)} of{' '}
        {totalItems})
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            onChange={handlePerPageChange}
            value={perPage}
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

      {/* Move this markup to Pagination */}
      <Pagination
        total={totalItems}
        perPage={perPage}
        currentPage={curPage}
        onPageChange={handlePageChange}
      />

      <ul>
        {visibleItems.map((item, index) => (
          <li key={index} data-cy="item">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
