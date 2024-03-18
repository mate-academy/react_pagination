import React, { useState } from 'react';

import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42).map(n => `Item ${n}`);

enum PerPage {
  Three = 3,
  Five = 5,
  Ten = 10,
  Twenty = 20,
}

export const App: React.FC = () => {
  const [perPage, setPerPage] = useState(PerPage.Five);
  const [currentPage, setCurrentPage] = useState(1);

  const total = items.length;
  const startIndex = (currentPage - 1) * perPage + 1;
  const endIndex = Math.min(currentPage * perPage, total);

  const visibleItems = items.filter(
    (_, index) =>
      index >= (currentPage - 1) * perPage && index < currentPage * perPage,
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPerPage(+event.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${startIndex} - ${endIndex} of ${total})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            value={perPage}
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            onChange={handlePerPageChange}
          >
            <option value={PerPage.Three}>{PerPage.Three}</option>
            <option value={PerPage.Five}>{PerPage.Five}</option>
            <option value={PerPage.Ten}>{PerPage.Ten}</option>
            <option value={PerPage.Twenty}>{PerPage.Twenty}</option>
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
        {visibleItems.map(item => (
          <li key={item} data-cy="item">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
