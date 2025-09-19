import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const items = getNumbers(1, 42).map(n => `Item ${n}`);

function getVisibleItems(
  allItems: string[],
  amountOfVisibleItems: number,
  page: number,
) {
  const start = (page - 1) * amountOfVisibleItems;
  const end = start + amountOfVisibleItems;

  return allItems.slice(start, end);
}

function getIndexOfStartEnd(
  total: number,
  page: number,
  amountOfItems: number,
): string {
  const startIndex = (page - 1) * amountOfItems + 1;
  const endIndex = Math.min(page * amountOfItems, total);

  return total > 0 ? `${startIndex} - ${endIndex}` : '0 - 0';
}

export const App: React.FC = () => {
  const [perPage, setPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  const prepearedItems = getVisibleItems(items, perPage, currentPage);

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        Page {currentPage} (items{' '}
        {getIndexOfStartEnd(items.length, currentPage, perPage)} of{' '}
        {items.length})
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={perPage}
            onChange={e => {
              setPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
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
        items={prepearedItems}
        total={items.length}
        perPage={perPage}
        currentPage={currentPage}
        onPageChange={(page: number) => setCurrentPage(page)}
      />
    </div>
  );
};

export default App;
