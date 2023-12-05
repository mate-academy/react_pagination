import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

const perPageSelector = [3, 5, 10, 20];
const totalItems = 42;
const defaultPage = 1;
const items = getNumbers(1, 42)
  .map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [perPageItems, setPerPageItems] = useState(perPageSelector[1]);
  const [currentPage, setCurrentPage] = useState(defaultPage);

  const firstItem = currentPage * perPageItems - perPageItems + 1;
  const lastItem = Math.min(firstItem + perPageItems - 1, totalItems);
  const currentItems = items.slice(firstItem - 1, lastItem);

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${firstItem} - ${lastItem} of ${totalItems})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={perPageItems}
            onChange={(event) => {
              setPerPageItems(+event.target.value);
              setCurrentPage(defaultPage);
            }}
          >
            {perPageSelector.map(option => (
              <option value={option} key={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <label htmlFor="perPageSelector" className="col-form-label col">
          items per page
        </label>
      </div>

      <Pagination
        total={totalItems}
        perPage={perPageItems}
        currentPage={currentPage}
        onChangePage={setCurrentPage}
      />

      <ul>
        {currentItems.map(item => (
          <li data-cy="item" key={item}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};
