import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items: Items = getNumbers(1, 42)
  .map(n => `Item ${n}`);

// type PerPage = 3 | 5 | 10 | 20;
type Items = string[];

export const App: React.FC = () => {
  const [perPage, setPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const total = items.length;
  let end = currentPage * perPage;
  const start = end - perPage;

  if (end - 1 > total) {
    end = total;
  }

  const visibleItems = items.slice(start, end);

  const savePage = (value: number) => {
    setCurrentPage(value);
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${start + 1} - ${end} of ${total})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            onChange={event => {
              setPerPage(+event.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="3">3</option>
            <option selected value="5">5</option>
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
        onPageChange={savePage}
      />
      <ul>
        {visibleItems.map(string => (
          <li data-cy="item" key={visibleItems.indexOf(string)}>{string}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
