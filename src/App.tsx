import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const PAGES_TOTAL = 42;

export const App: React.FC = () => {
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const firstItem = page * itemsPerPage - itemsPerPage + 1;
  const lastItem =
    firstItem + itemsPerPage - 1 >= PAGES_TOTAL
      ? PAGES_TOTAL
      : firstItem + itemsPerPage - 1;

  const items = getNumbers(firstItem, lastItem).map(n => (
    <li data-cy="item" key={n}>
      Item {n}
    </li>
  ));

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        Page {page} (items {firstItem} - {lastItem} of {PAGES_TOTAL})
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            value={itemsPerPage}
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            onChange={event => {
              setItemsPerPage(Number(event.target.value));
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

      <Pagination
        total={PAGES_TOTAL}
        itemsPerPage={itemsPerPage}
        currentPage={page}
        onPageChange={setPage}
      />
      <ul>{items}</ul>
    </div>
  );
};

export default App;
