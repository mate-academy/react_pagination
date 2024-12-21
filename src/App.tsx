import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const TOTAL_ITEMS = 42;
const DEFAULT_PER_PAGE = 5;
const PER_PAGE_OPTIONS = [3, 5, 10, 20];

const items = getNumbers(1, TOTAL_ITEMS).map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(DEFAULT_PER_PAGE);

  const lastItemIndex = currentPage * perPage;
  const firstItemIndex = lastItemIndex - perPage;
  const itemsToDisplay = items.slice(firstItemIndex, lastItemIndex);
  const lastItemToDisplay = Math.min(lastItemIndex, TOTAL_ITEMS);
  const defaultInfo = `Page ${currentPage} (items ${firstItemIndex + 1} - ${lastItemToDisplay} of ${TOTAL_ITEMS})`;

  const handlePageChange = (page: number) => {
    if (page !== currentPage) {
      setCurrentPage(page);
    }
  };

  const handlePerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newPerPage = +e.target.value;

    setPerPage(newPerPage);
    setCurrentPage(1);
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {defaultInfo}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            value={perPage}
            className="form-control"
            onChange={handlePerPageChange}
          >
            {PER_PAGE_OPTIONS.map(option => (
              <option value={option} key={option}>
                {option}
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
        onPageChange={handlePageChange}
      />

      <ul>
        {itemsToDisplay.map((item, index) => (
          <li data-cy="item" key={`item-${firstItemIndex + index}`}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
