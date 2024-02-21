import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';

// eslint-disable-next-line @typescript-eslint/no-unused-vars

const items = getNumbers(1, 42).map(n => `Item ${n}`);
const numbers = getNumbers(0, 8);
const mappedNumbers = numbers.map(n => (n <= 9 ? n + 1 : n));

export const App: React.FC = () => {
  const [perPage, setPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotal] = useState(42);

  const itemsToPrint = () => {
    return items.slice(currentPage * perPage - perPage, currentPage * perPage);
  };

  const onSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPerPage(parseInt(event.currentTarget.value, 10));
    setTotal(totalPage);
    setCurrentPage(1);
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${currentPage * perPage - perPage + 1} - ${
          currentPage === Math.ceil(totalPage / perPage)
            ? totalPage
            : currentPage * perPage
        } of 42)`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            defaultValue={5}
            onChange={onSelectChange}
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

      {/* Move this markup to Pagination */}
      <ul className="pagination">
        <li className="page-item disabled">
          <a
            onClick={() => setCurrentPage(currentPage - 1)}
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled="true"
          >
            «
          </a>
        </li>
        {mappedNumbers.map(num => (
          <li className={currentPage === num ? 'page-item active' : ''}>
            <a
              data-cy="pageLink"
              onClick={() => setCurrentPage(currentPage + 1)}
              className="page-link"
              href={`#${num}`}
            >
              {num}
            </a>
          </li>
        ))}
        <li className="page-item">
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled="false"
          >
            »
          </a>
        </li>
      </ul>
      <ul>
        {itemsToPrint().map(item => (
          <li data-cy="item" key={item}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
