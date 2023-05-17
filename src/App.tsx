import React, { ChangeEvent, useState } from 'react';
import './App.css';

import { Pagination } from './components/Pagination';
import { getItemsToShowIndex } from './utils';

export const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(5);

  const handleSelectPerPage
    = (e: ChangeEvent<HTMLSelectElement>) => {
      setPerPage(+e.target.value);
      setCurrentPage(1);
    };

  const handlePageChange
    = (value: number) => setCurrentPage(value);

  const total = 42;
  const [from, to] = getItemsToShowIndex(perPage, currentPage, total);

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        Page
        {' '}
        {currentPage}
        {' '}
        (items
        {' '}
        {from}
        {' '}
        -
        {' '}
        {to}
        {' '}
        of
        {' '}
        {total}
        )
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            defaultValue={perPage}
            onChange={handleSelectPerPage}
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
        perPage={perPage}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default App;
