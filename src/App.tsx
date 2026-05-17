import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42).map(n => `Item ${n}`);
const total = items.length;

export const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(5);
  let totalPages = Math.ceil(total / perPage);
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const setPages = (value: number) => {
    setCurrentPage(1);
    setPerPage(value);
    totalPages = Math.ceil(total / value);
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        Page {currentPage} (items {(currentPage - 1) * perPage + 1} -{' '}
        {Math.min(currentPage * perPage, total)} of {total})
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            defaultValue={perPage}
            onChange={e => {
              setPages(Number(e.target.value));
            }}
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
        total={total} // total number of items to paginate
        perPage={perPage} // number of items per page
        currentPage={currentPage} /* optional with 1 by default */
        pages={pages}
        onPageChange={page => {
          setCurrentPage(page);
        }}
      />
      <ul>
        {items
          .slice(currentPage * perPage - perPage, currentPage * perPage)
          .map((item, index) => {
            const value = item;

            return (
              <li key={index} data-cy="item">
                {value}
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default App;
