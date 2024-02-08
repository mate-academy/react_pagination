import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

const items = getNumbers(1, 42)
  .map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [perPage, setPerPage] = useState<number>(5);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const perPageOptions: number[] = [3, 5, 10, 20];

  const startIndex: number = (currentPage - 1) * perPage;
  let endIndex: number = (currentPage - 1) * perPage + perPage;

  if (endIndex > items.length) {
    endIndex = items.length;
  }

  const visibleItems = items.slice(startIndex, endIndex);

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${startIndex + 1} - ${endIndex} of ${items.length})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={perPage}
            onChange={option => {
              setPerPage(+option.target.value);
              setCurrentPage(1);
            }}
          >
            {perPageOptions.map(oneOption => (
              <option
                key={oneOption}
                value={oneOption}
              >
                {oneOption}
              </option>
            ))}
          </select>
        </div>

        <label htmlFor="perPageSelector" className="col-form-label col">
          items per page
        </label>
      </div>

      <Pagination
        total={items.length}
        perPage={perPage}
        currentPage={currentPage}
        onPageChange={(page) => setCurrentPage(page)}
      />

      <ul>
        {visibleItems.map(visibleItem => (
          <li
            key={visibleItem}
            data-cy="item"
          >
            {visibleItem}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
