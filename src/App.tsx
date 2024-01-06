import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

interface FilterParams {
  sortOptional: number;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42)
  .map(n => `Item ${n}`);

function itemsPerPage({ sortOptional }: FilterParams) {
  const packItems = [...items];

  switch (sortOptional) {
    case 3:
      return packItems.slice(0, 3);
    case 5:
      return packItems.slice(0, 5);
    case 10:
      return packItems.slice(0, 10);
    case 20:
      return packItems.slice(0, 20);
    default:
      return packItems.slice(0, 3);
  }
}

export const App: React.FC = () => {
  const [page, setPage] = useState(1);
  const [sortOptional, setSortOptional] = useState(5);
  const visibleItems = itemsPerPage({ sortOptional });

  const firstItem = (page - 1) * sortOptional;
  const lastItem = page * sortOptional < items.length
    ? page * sortOptional
    : items.length;

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${page} (items ${firstItem + 1} - ${lastItem} of ${items.length})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            value={sortOptional}
            onChange={(e) => setSortOptional(+e.target.value)}
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

      <Pagination
        total={42}
        perPage={sortOptional}
        currentPage={page}
        onPageChange={setPage}
      />

      <ul>
        {visibleItems.map((item) => (
          <li data-cy="item" key={item}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
