import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const TOTAL = 42;
const items = getNumbers(1, TOTAL).map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [perPage, setPerPage] = useState(5);
  const pages = Math.ceil(items.length / perPage);
  const [currentPage, setCurrentPage] = useState(1);

  const startSlice = (currentPage - 1) * perPage;
  const endSlice = Math.min(items.length, currentPage * perPage);

  const updatedItems = [...items].slice(startSlice, endSlice);

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        Page {currentPage} (items {startSlice + 1} - {endSlice} of {TOTAL})
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            defaultValue={perPage}
            onChange={e => setPerPage(Number(e.target.value))}
          >
            {[3, 5, 10, 20].map(item => (
              <option value={item} key={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        <label htmlFor="perPageSelector" className="col-form-label col">
          items per page
        </label>
      </div>

      {/* Move this markup to Pagination */}
      <ul className="pagination">
        <li className={`page-item ${currentPage - 1 === 0 ? 'disabled' : ''}`}>
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled="true"
            onClick={e => {
              e.preventDefault();
              setCurrentPage(currentPage + 1);
            }}
          >
            «
          </a>
        </li>
        {Array.from({ length: pages }).map((page, idx) => (
          <li
            className={`page-item ${idx + 1 === currentPage ? 'active' : ''}`}
            key={idx + 1}
          >
            <a
              data-cy="pageLink"
              className="page-link"
              href={`#{page}`}
              key={idx + 1}
              onClick={e => {
                e.preventDefault();
                setCurrentPage(idx + 1);
              }}
            >
              {idx + 1}
            </a>
          </li>
        ))}
        <li
          className={`page-item ${currentPage === items.length ? 'disabled' : ''}`}
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled="false"
            onClick={e => {
              e.preventDefault();
              setCurrentPage(currentPage + 1);
            }}
          >
            »
          </a>
        </li>
      </ul>
      <ul>
        {updatedItems.map((item, idx) => (
          <li data-cy="item" key={idx}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
