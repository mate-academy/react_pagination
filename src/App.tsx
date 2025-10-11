import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42).map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const total = items.length;
  const startIndex = (currentPage - 1) * perPage;
  const endIndex = startIndex + perPage;
  const visibleItems = items.slice(startIndex, endIndex);
  const displayStart = total === 0 ? 0 : startIndex + 1;
  const displayEnd = total === 0 ? 0 : Math.min(endIndex, total);

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      {/* Інформаційний рядок */}
      <p className="lead" data-cy="info">
        Page {currentPage} (items {displayStart} - {displayEnd} of {total})
      </p>

      {/* Селектор кількості елементів на сторінці */}
      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            className="form-control"
            value={perPage}
            onChange={e => {
              setPerPage(Number(e.target.value));
              setCurrentPage(1); // повертаємося на першу сторінку
            }}
          >
            <option value={3}>3</option>
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
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
      {/* Список поточних елементів */}
      <ul>
        {visibleItems.map(item => (
          <li key={item} data-cy="item">
            {item}
          </li>
        ))}
      </ul>

      {/* Move this markup to Pagination */}
    </div>
  );
};

export default App;
