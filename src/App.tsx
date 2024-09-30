import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42).map(n => `Item ${n}`);
const total = items.length;

export const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(5);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentPage(1);
    setItemsPerPage(+e.target.value);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const lastIndex = startIndex + itemsPerPage;
  const visibleItems = items.slice(startIndex, lastIndex);

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        Page {currentPage} (items {startIndex + 1} -{' '}
        {lastIndex > total ? total : lastIndex} of {total})
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={itemsPerPage}
            onChange={handleChange}
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

      {/* Move this markup to Pagination */}
      <Pagination
        totalItems={total}
        itemsPerPage={itemsPerPage}
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
