import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42).map(n => `Item ${n}`);
const totalItems = items.length;

type PerPageOption = 3 | 5 | 10 | 20;
const perPageOptions: PerPageOption[] = [3, 5, 10, 20];

export const App: React.FC = () => {
  const [perPage, setPerPage] = useState<PerPageOption>(5);
  const [currentPage, setCurrentPage] = useState(1);
  const startIndex = (currentPage - 1) * perPage;
  const endIndex = startIndex + perPage;
  const firstItemIndex = totalItems === 0 ? 0 : (currentPage - 1) * perPage + 1;
  const lastItemIndex = Math.min(currentPage * perPage, totalItems);
  const itemsToShow = items.slice(startIndex, endIndex);

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        Page {currentPage} (items {firstItemIndex} - {lastItemIndex} of{' '}
        {totalItems})
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={perPage}
            onChange={e => {
              setPerPage(Number(e.target.value) as PerPageOption);
              setCurrentPage(1);
            }}
          >
            {perPageOptions.map(option => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <label htmlFor="perPageSelector" className="col-form-label col">
          items per page
        </label>
      </div>

      {/* Move this markup to Pagination */}
      <Pagination
        total={totalItems}
        perPage={perPage}
        currentPage={currentPage}
        onPageChange={pageNumber => setCurrentPage(pageNumber)}
      />
      <ul>
        {itemsToShow.map(item => {
          return (
            <li data-cy="item" key={item}>
              {item}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default App;
