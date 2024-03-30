import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42).map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [currentPage, setPage] = useState(1);
  const [perPage, setPerPage] = useState(5);

  const showFrom = currentPage * perPage - perPage;
  const showTo =
    currentPage * perPage > items.length ? items.length : currentPage * perPage;

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${showFrom + 1} - ${showTo} of ${items.length})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            onChange={event => {
              setPerPage(+event.target.value);
              setPage(1);
            }}
          >
            <option value="3">3</option>
            <option value="5" selected>
              5
            </option>
            <option value="10">10</option>
            <option value="20">20</option>
          </select>
        </div>

        <label htmlFor="perPageSelector" className="col-form-label col">
          items per page
        </label>
      </div>

      <Pagination
        total={items.length}
        perPage={perPage}
        currentPage={currentPage}
        onPageChange={page => setPage(page)}
      />

      <ul>
        {items.slice(showFrom, showTo).map((item, index) => (
          <li data-cy="item" key={index}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
