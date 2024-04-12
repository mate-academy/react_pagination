import React, { useState } from 'react';
import './App.css';

import { getNumbers, defaultValuePage, defaultValuePerPage } from './utils';
import { Pagination } from './components/Pagination';

// eslint-disable-next-line @typescript-eslint/no-unused-vars

const totalItems: Array<string> = getNumbers(1, 42).map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [currentPerPage, setCurrentPerPage] =
    useState<number>(defaultValuePerPage);
  const [currentPage, setCurrentPage] = useState<number>(defaultValuePage);

  const pages = currentPerPage * currentPage;
  const prevPage = (currentPage - 1) * currentPerPage;
  const normalizeTotalItems = totalItems.slice(prevPage, pages);

  const from =
    prevPage + 1 < totalItems.length ? prevPage + 1 : totalItems.length - 1;
  const to = pages < totalItems.length ? pages : totalItems.length;

  const selectPerPage = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentPerPage(+e.target.value);
    setCurrentPage(defaultValuePage);
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        Page {currentPage} (items {from} - {to} of {totalItems.length})
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            value={currentPerPage}
            onChange={selectPerPage}
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

      <Pagination
        total={totalItems.length}
        perPage={currentPerPage}
        currentPage={currentPage}
        onPageChange={(page: number) => {
          setCurrentPage(page);
        }}
      />

      <ul>
        {normalizeTotalItems.map(value => (
          <li key={value} data-cy="item">
            {value}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
