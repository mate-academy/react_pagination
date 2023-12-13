import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

const items = getNumbers(1, 42).map(n => `Item ${n}`);
const total = items.length;
const pageElementCounts = [3, 5, 10, 20];

export const App: React.FC = () => {
  const [perPage, setPerPage] = useState(pageElementCounts[1]);
  const [currentPage, setPage] = useState(1);

  const itemsFrom = (currentPage - 1) * perPage + 1;
  const itemsTo = Math.min(currentPage * perPage, total);

  const handlePerPageSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPerPage(+event.target.value);
    setPage(1);
  };

  const handlePageChange = (page: number) => {
    setPage(page);
  };

  const itemsAtPage = items.slice(itemsFrom - 1, itemsTo);

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${itemsFrom} - ${itemsTo} of ${total})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={perPage}
            onChange={handlePerPageSelect}
          >
            { pageElementCounts.map((count) => (
              <option key={count} value={count}>
                {count}
              </option>
            ))}
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

      { itemsAtPage.length && (
        <ul>
          {itemsAtPage.map((item => (
            <li
              data-cy="item"
              key={item}
            >
              {item}
            </li>
          )))}
        </ul>
      )}
    </div>
  );
};

export default App;
