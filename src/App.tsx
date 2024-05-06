import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const allItems = 42;
const items = getNumbers(1, allItems).map(n => `Item ${n}`);
const itemsOnPage = [3, 5, 10, 20];

export const App: React.FC = () => {
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  const pageCount = getNumbers(1, Math.ceil(allItems / itemsPerPage));
  const firstItem = (currentPage - 1) * itemsPerPage;
  const lastItem = Math.min(currentPage * itemsPerPage, items.length);
  const visibleItems = items.slice(firstItem, lastItem);

  function handlePerPageSelector(value: number) {
    setItemsPerPage(value);
    setCurrentPage(1);
  }

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        Page {currentPage} (items {firstItem + 1} - {lastItem} of {allItems})
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={itemsPerPage}
            onChange={event => {
              handlePerPageSelector(+event.target.value);
            }}
          >
            {itemsOnPage.map(item => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        <label htmlFor="perPageSelector" className="col-form-label col">
          items per page
        </label>
      </div>

      <Pagination
        currentPage={currentPage}
        changePage={setCurrentPage}
        pages={pageCount}
      />

      <ul>
        {visibleItems.map(item => (
          <li key={item} data-cy="item">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
