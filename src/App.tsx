/* eslint-disable max-len */
import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

const items = getNumbers(1, 42);

export const App: React.FC = () => {
  const [perPage, setPerPage] = useState<string>('5');
  const [currentPage, setCurrentPage] = useState<number>(1);

  const total = items.length;
  const pages = Math.ceil(total / +perPage);

  const startIndex = (currentPage - 1) * +perPage;
  const endIndex = startIndex + +perPage;
  const visibleItems = items.slice(startIndex, endIndex);

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        Page {currentPage} (items {startIndex + 1} - {Math.min(endIndex, total)}{' '}
        of {total})
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            onChange={e => {
              setPerPage(e.target.value);
              setCurrentPage(1);
            }}
            value={perPage}
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
        pages={pages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />

      <ul>
        {visibleItems.map((item, index) => (
          <li data-cy="item" key={index}>
            Item {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
