import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42).map(n => `Item ${n}`);
const total = items.length;

export const App: React.FC = () => {
  const [perPage, setPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const firstItem = perPage * (currentPage - 1);
  const lastItem = firstItem + perPage;
  const visibleItems = items.slice(firstItem, lastItem);

  function handlePerPageSelectorChange(
    event: React.ChangeEvent<HTMLSelectElement>,
  ) {
    setPerPage(Number(event.target.value));
    setCurrentPage(1);
  }

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        Page {currentPage} (items {firstItem + 1} -{' '}
        {lastItem > total ? total : lastItem} of {total})
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            name="selector"
            value={perPage}
            onChange={handlePerPageSelectorChange}
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
        total={total}
        perPage={perPage}
        currentPage={currentPage}
        onPageChange={page => setCurrentPage(page)}
      />
      {visibleItems.map(item => {
        return (
          <li key={item} data-cy="item">
            {item}
          </li>
        );
      })}
    </div>
  );
};

export default App;
