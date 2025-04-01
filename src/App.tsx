import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42).map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [pageSelector, setPageSelector] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  const firstItem = (currentPage - 1) * pageSelector + 1;
  const lastItem = Math.min(currentPage * pageSelector, items.length);

  const startIndex = (currentPage - 1) * pageSelector;
  const visibleItems = items.slice(startIndex, startIndex + pageSelector);

  const handlerPageSelectorChange = event => {
    setPageSelector(Number(event.target.value));
    setCurrentPage(1);
  };

  const handlerPageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        Page {currentPage} (items {firstItem} - {lastItem} of {items.length})
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={pageSelector}
            onChange={handlerPageSelectorChange}
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
        total={items.length}
        perPage={+pageSelector}
        currentPage={currentPage}
        onPageChange={handlerPageChange}
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
