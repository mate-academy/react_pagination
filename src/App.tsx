import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42).map(n => `Item ${n}`);

export const App: React.FC = () => {
  const itemsLength = items.length;
  const [pageChange, setPageChange] = useState(1);
  const [perPageSelector, setPerPageSelector] = useState(5);

  const fromItem = pageChange * perPageSelector - perPageSelector;
  const toItem = pageChange * perPageSelector;
  const currentItems: string[] = items.slice(fromItem, toItem);

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        Page {pageChange} (items {fromItem + 1} -{' '}
        {Math.min(pageChange * perPageSelector, itemsLength)} of {itemsLength})
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            defaultValue={perPageSelector}
            onChange={e => {
              setPerPageSelector(+e.target.value);
              setPageChange(1);
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
        total={itemsLength}
        perPage={perPageSelector}
        currentPage={pageChange}
        onPageChange={page => {
          setPageChange(page);
        }}
      />

      <ul>
        {currentItems.map((a, i) => {
          return (
            <li key={i} data-cy="item">
              {a}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default App;
