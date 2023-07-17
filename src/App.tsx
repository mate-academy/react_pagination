import React, { useState, useMemo } from 'react';

import './App.css';
import { Pagination } from './components/Pagination';
import { getNumbers } from './utils';

const TOTAL_ITEMS_COUNT = 42;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, TOTAL_ITEMS_COUNT)
  .map(n => `Item ${n}`);

function getVisibleItems(
  currentItems: string[],
  start: number,
  end: number,
): string[] {
  return currentItems.slice(start, end);
}

export const App: React.FC = () => {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const startCount = ((page - 1) * perPage);

  const endCount = startCount + perPage > TOTAL_ITEMS_COUNT
    ? TOTAL_ITEMS_COUNT
    : startCount + perPage;

  const visibleItems = useMemo(
    () => getVisibleItems(items, startCount, endCount),
    [items, startCount, endCount],
  );

  const changeSelect = (value: number) => {
    if (value !== perPage) {
      setPerPage(value);
      setPage(1);
    }
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${page} (items ${startCount + 1} - ${endCount} of ${TOTAL_ITEMS_COUNT})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
              changeSelect(+event.target.value);
            }}
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            defaultValue={perPage}
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
        total={TOTAL_ITEMS_COUNT}
        perPage={perPage}
        currentPage={page}
        onPageChange={setPage}
      />
      <ul>
        {visibleItems.map((item) => (
          <li key={item} data-cy="item">{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
