import React, { ChangeEvent, useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

// eslint-disable-next-line @typescript-eslint/no-unused-vars

export const App: React.FC = () => {
  const totalAmount = 42;
  const items = getNumbers(1, 42).map(n => `Item ${n}`);
  const [value, setValue] = useState(5);
  const [sortPage, setSortPage] = useState(1);

  const handlePageChange = (page: number) => {
    setSortPage(page);
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        Page {sortPage} (items {(sortPage - 1) * value + 1} -{' '}
        {Math.min(sortPage * value, totalAmount)} of {totalAmount})
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={value}
            onChange={(e: ChangeEvent<HTMLSelectElement>) => {
              setValue(Number(e.target.value));
              setSortPage(1);
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
      {/* <ul className="pagination">
        <li className="page-item disabled">
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled="true">
            «
          </a>
        </li>
        <li className="page-item active">
          <a data-cy="pageLink" className="page-link" href="#1">
            1
          </a>
        </li>
        <li className="page-item">
          <a data-cy="pageLink" className="page-link" href="#2">
            2
          </a>
        </li>
        <li className="page-item">
          <a data-cy="pageLink" className="page-link" href="#3">
            3
          </a>
        </li>
        <li className="page-item">
          <a data-cy="pageLink" className="page-link" href="#4">
            4
          </a>
        </li>
        <li className="page-item">
          <a data-cy="pageLink" className="page-link" href="#5">
            5
          </a>
        </li>
        <li className="page-item">
          <a data-cy="pageLink" className="page-link" href="#6">
            6
          </a>
        </li>
        <li className="page-item">
          <a data-cy="pageLink" className="page-link" href="#7">
            7
          </a>
        </li>
        <li className="page-item">
          <a data-cy="pageLink" className="page-link" href="#8">
            8
          </a>
        </li>
        <li className="page-item">
          <a data-cy="pageLink" className="page-link" href="#9">
            9
          </a>
        </li>
        <li className="page-item">
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled="false">
            »
          </a>
        </li>
      </ul> */}
      <Pagination
        total={totalAmount}
        perPage={value}
        currentPage={sortPage}
        onPageChange={handlePageChange}
      />
      <ul>
        {items
          .slice((sortPage - 1) * value, sortPage * value)
          .map((item, index) => (
            <li key={index} data-cy="item">
              {item}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default App;
