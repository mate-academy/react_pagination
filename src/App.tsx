import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items: string[] = getNumbers(1, 42)
  .map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [selector, setSelector] = useState(5);
  const [page, setPage] = useState(1);
  const startItem = (page * selector) - selector + 1;
  let endItem = page * selector;
  const ITEMS_PER_PAGE = [3, 5, 10, 20];

  if (endItem > items.length) {
    endItem = items.length;
  }

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${page} (items ${startItem} - ${endItem} of 42)`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={selector}
            onChange={(event) => {
              setSelector(+event.currentTarget.value);
              setPage(1);
            }}
          >
            {ITEMS_PER_PAGE.map(item => (
              <option value={item}>{item}</option>
            ))}
          </select>
        </div>

        <label htmlFor="perPageSelector" className="col-form-label col">
          items per page
        </label>
      </div>

      <Pagination
        total={items.length}
        perPage={selector}
        currentPage={page}
        onPageChange={setPage}
      />
    </div>
  );
};

export default App;
