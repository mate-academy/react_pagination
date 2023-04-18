import React, { useState } from 'react';
import './App.css';

import { Pagination } from './components/Pagination';

const PER_PAGE = 5;
const TOTAL = 42;

export const App: React.FC = () => {
  const [perPage, setPerPage] = useState(PER_PAGE);
  const [currentPage, setCurrentPage] = useState(1);
  const [total] = useState(TOTAL);

  const handleSelect = (e: React.BaseSyntheticEvent) => {
    setPerPage(parseInt(e.target.value, 10));
    setCurrentPage(1);
  };

  const from = (currentPage - 1) * perPage;
  const to = Math.min(from + perPage, total);

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${from + 1} - ${to} of ${total})`}
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
        total={total}
        currentPage={currentPage}
        perPage={perPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default App;
