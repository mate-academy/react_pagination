import './App.css';
import React, { useState } from 'react';
import { getNumbers } from './utils';

import { Pagination } from './components/Pagination';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const FROM = 1;
const TO = 42;

const items = getNumbers(FROM, TO)
  .map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  const perPageSelectors: number[] = [3, 5, 10, 20];
  const startItem: number = currentPage * itemsPerPage + 1 - itemsPerPage;
  const endItem: number = Math.min(currentPage * itemsPerPage, items.length);

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${startItem} - ${endItem} of ${items.length})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            onChange={(event) => {
              setItemsPerPage(Number.parseInt(event.target.value, 10));
              setCurrentPage(1);
            }}
          >
            {perPageSelectors.map(pageSelector => (
              <option
                value={pageSelector}
                selected={pageSelector === itemsPerPage}
                key={pageSelector}
              >
                {pageSelector}
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
        perPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default App;
