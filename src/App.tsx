import React, { useState } from 'react';
import './App.css';

import { Pagination } from './components/Pagination';

import { getNumbers } from './utils';

const itemsList = getNumbers(1, 42)
  .map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [perPage, setPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [items] = useState(itemsList);

  const handleSelect = (e: React.BaseSyntheticEvent) => {
    setPerPage(parseInt(e.target.value, 10));
    setCurrentPage(1);
  };

  const from = (currentPage - 1) * perPage;
  const to = Math.min(from + perPage, items.length);

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${from + 1} - ${to} of ${items.length})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={perPage}
            onChange={handleSelect}
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
        items={items}
        currentPage={currentPage}
        perPage={perPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default App;
