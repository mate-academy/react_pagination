import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

const items = getNumbers(1, 42)
  .map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [perPage, setPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  const total = getNumbers(1, Math.ceil(items.length / perPage));

  const firstElement = (currentPage - 1) * perPage + 1;
  const lastElement = Math.min(currentPage * perPage, items.length);
  const visibleItems = items.slice(firstElement - 1, lastElement);

  const handleVisibleItem = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentPage(1);
    setPerPage(Number(event.target.value));
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${firstElement} - ${lastElement} of ${items.length})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={perPage}
            onChange={handleVisibleItem}
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
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />

      {visibleItems.map(item => (
        <li data-cy="item" key={item}>
          {item}
        </li>
      ))}
    </div>
  );
};

export default App;
