import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42).map(n => `Item ${n}`);
const TOTAL_ITEMS = items.length;
const DEFAULT_PER_PAGE = 5;
const DEFAULT_CURRENT_PAGE = 1;

export const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(DEFAULT_CURRENT_PAGE);
  const [perPage, setPerPage] = useState(DEFAULT_PER_PAGE);

  // Calculate the items to display for the current page
  const startIndex = (currentPage - 1) * perPage;
  const endIndex = startIndex + perPage;
  const visibleItems = items.slice(startIndex, endIndex);

  // Calculate the range of item numbers for info text
  const firstItemNum = Math.min(startIndex + 1, TOTAL_ITEMS);
  const lastItemNum = Math.min(endIndex, TOTAL_ITEMS);

  // Handle page change
  const handlePerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newPerPage = Number(event.target.value);

    setPerPage(newPerPage);
    setCurrentPage(1); // Reset to first page when perPage changes
  };

  // Dinamic info text
  const infoText =
    TOTAL_ITEMS > 0
      ? `Page ${currentPage} (items ${firstItemNum} - ${lastItemNum} of ${TOTAL_ITEMS})`
      : 'No items to display';

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      {/* Display dynamic info */}
      <p className="lead" data-cy="info">
        {infoText}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={perPage}
            onChange={handlePerPageChange}
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
        total={TOTAL_ITEMS}
        perPage={perPage}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        items={visibleItems}
      />
    </div>
  );
};

export default App;
