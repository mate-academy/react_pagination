import React from 'react';
import { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

const items = getNumbers(1, 42).map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(5);

  const start = (currentPage - 1) * perPage + 1;
  const end = Math.min(start + perPage - 1, items.length);
  const total = items.length;

  function handlePageChange(newPage: number) {
    if (newPage !== currentPage) {
      setCurrentPage(newPage);
    }
  }

  function handlePerPageChange(newPerPage: number) {
    setPerPage(newPerPage);
    setCurrentPage(1);
  }

  function getVisibleItems(
    list: string[],
    current: number,
    itemsPerPage: number,
  ) {
    const startIndex = (current - 1) * itemsPerPage;

    return list.slice(startIndex, startIndex + itemsPerPage);
  }

  const visibleItems = getVisibleItems(items, currentPage, perPage);

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        Page {currentPage} (items {start} - {end} of 42)
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={perPage}
            onChange={event => handlePerPageChange(Number(event.target.value))}
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
        onPageChange={handlePageChange}
      />
      <ul>
        {visibleItems.map((item: string) => (
          <li key={item} data-cy="item">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
