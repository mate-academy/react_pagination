/* eslint-disable @typescript-eslint/indent */
import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

const TOTAL_ITEMS = 42;
const items = getNumbers(1, TOTAL_ITEMS).map(n => `Item ${n}`);
const itemsPerPage = [3, 5, 10, 20];

export const App: React.FC = () => {
  const [perPage, setPerPage] = useState(itemsPerPage[1]);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsFrom = perPage * currentPage - perPage + 1;
  const itemsTo = Math.min(perPage * currentPage, TOTAL_ITEMS);

  const visibleItems = items.slice(itemsFrom - 1, itemsTo);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPerPage(+event.target.value);
    setCurrentPage(1);
  };

  const handlePageSelection = (page: number) => {
    if (page !== currentPage) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${itemsFrom} - ${itemsTo} of ${TOTAL_ITEMS})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={perPage}
            onChange={handleSelectChange}
          >
            {itemsPerPage.map(amount => (
              <option key={amount} value={amount}>
                {amount}
              </option>
            ))}
          </select>
        </div>

        <label htmlFor="perPageSelector" className="col-form-label col">
          items per page
        </label>
      </div>

      <Pagination
        total={TOTAL_ITEMS}
        perPage={perPage}
        currentPage={currentPage}
        onPageChange={handlePageSelection}
      />

      <ul>
        {visibleItems.map(item => (
          <li key={item} data-cy="item">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
