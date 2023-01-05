import React, { useState } from 'react';
import './App.css';
import { Pagination } from './components/Pagination';
import { getNumbers } from './utils';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42)
  .map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [page, setPage] = useState(1);
  const [select, setSelect] = useState(5);

  const startItems = page * select - select;
  const endItems = page * select <= 42 ? page * select : 42;

  const visibleItems = items.slice(startItems, endItems);

  const handlePageChange = (p: number | string) => {
    if (typeof p === 'number') {
      setPage(p);
    }

    if (p === 'prev') {
      setPage(page - 1);
    }

    if (p === 'next') {
      setPage(page + 1);
    }
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${page} (items ${startItems + 1} - ${endItems} of 42)`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={select}
            onChange={(event) => {
              setSelect(Number(event.target.value));
              setPage(1);
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
        total={42}
        perPage={select}
        currentPage={page}
        onPageChange={handlePageChange}
      />

      <ul>
        {visibleItems.map(item => (
          <li data-cy="item">{item}</li>
        ))}

      </ul>
    </div>
  );
};

export default App;
