import React, { useState } from 'react';

import './App.css';
import { Pagination } from './components/Pagination';

const total = 42;
const itemsPerPage = [3, 5, 10, 20];

export const App: React.FC = () => {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const startIndex = (page - 1) * perPage;
  const endIndex = Math.min(startIndex + perPage, total);

  const handlePageChange = (currentPage: number) => {
    if (currentPage !== page) {
      setPage(currentPage);
    }
  };

  const handlePerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPerPage(Number(event.target.value));
    setPage(1);
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${page} (items ${startIndex + 1} - ${endIndex} of ${total})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={perPage}
            onChange={handlePerPageChange}
          >
            {itemsPerPage.map(numberOfItems => (
              <option key={numberOfItems} value={numberOfItems}>
                {numberOfItems}
              </option>
            ))}
          </select>
        </div>

        <label htmlFor="perPageSelector" className="col-form-label col">
          items per page
        </label>
      </div>

      <Pagination
        total={total}
        perPage={perPage}
        currentPage={page}
        onPageChange={handlePageChange}
        startIndex={startIndex}
        endIndex={endIndex}
      />
    </div>
  );
};
