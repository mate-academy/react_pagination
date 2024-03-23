import './App.css';

import React, { useState } from 'react';

import { Pagination } from './components/Pagination';
import { getNumbers } from './utils';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42).map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(5);

  const itemsLeft = [...items];
  const itemsSectioned = [];

  while (itemsLeft.length > 0) {
    itemsSectioned.push(itemsLeft.splice(0, perPage));
  }

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        Page {currentPage} (items {perPage * currentPage - perPage + 1} -{' '}
        {Math.min(currentPage * perPage, items.length)} of {items.length})
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            defaultValue={'5'}
            onChange={e => {
              setPerPage(+e.target.value);
              setCurrentPage(1);
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
        totalPages={itemsSectioned.length}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />

      <ul>
        {itemsSectioned[currentPage - 1].map(i => (
          <li key={i} data-cy="item">
            {i}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
