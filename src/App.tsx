import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';

import { Pagination } from './components/Pagination/Pagination';

export const App: React.FC = () => {
  const [perPage, setPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  const handleChangePerPage = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPerPage(Number(event.target.value));
    setCurrentPage(1);
  };

  const handlePageChange = (page: number | string) => {
    if (typeof page === 'number') {
      setCurrentPage(page);
    }

    if (page === 'next') {
      setCurrentPage(current => current + 1);
    }

    if (page === 'prev') {
      setCurrentPage(current => current - 1);
    }
  };

  const total = 42;
  const lastItemOnPage = Math.min(perPage * currentPage, total);
  const firstItemOnPage = perPage * (currentPage - 1) + 1;

  const itemsPerPage = getNumbers(firstItemOnPage, lastItemOnPage);

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${firstItemOnPage} - ${lastItemOnPage} of 42)`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={perPage}
            onChange={(event) => handleChangePerPage(event)}
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
        total={total}
        perPage={perPage}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />

      <ul>
        {itemsPerPage.map(item => (
          <li data-cy="item" key={item}>
            {`Item ${item}`}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
