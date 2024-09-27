import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

const items = getNumbers(1, 42).map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [perPage, setPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  const handleChangeSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newPerPage = +event.target.value;

    setPerPage(newPerPage);
    setCurrentPage(1);
  };

  const firstItemIndex = (currentPage - 1) * perPage + 1;
  const lastItemIndex = Math.min(currentPage * perPage, items.length);

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        Page {currentPage} (items {firstItemIndex} - {lastItemIndex} of {items.length})
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={perPage}
            onChange={handleChangeSelect}
          >
            {[3, 5, 10, 20].map(num => (
              <option value={num} key={num}>
                {num}
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
        items={items}
        perPage={perPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default App;
