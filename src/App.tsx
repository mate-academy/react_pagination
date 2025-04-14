import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

const TOTAL_ITEMS = 42;
const ITEMS_PER_PAGE_OPTIONS = [3, 5, 10, 20];

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, TOTAL_ITEMS).map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  const itemStart = itemsPerPage * currentPage - itemsPerPage + 1;

  let itemEnd = itemsPerPage * currentPage;

  if (itemEnd > TOTAL_ITEMS) {
    itemEnd = TOTAL_ITEMS;
  }

  const handleChangeItemsPerPage = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setItemsPerPage(+event.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        Page {currentPage} (items {itemStart} - {itemEnd} of {TOTAL_ITEMS})
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={itemsPerPage}
            onChange={handleChangeItemsPerPage}
          >
            {ITEMS_PER_PAGE_OPTIONS.map(num => (
              <option key={num} value={num}>
                {num}
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
        perPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />

      <ul>
        {items
          .map((item, i) => (
            <li key={i} data-cy="item">
              {item}
            </li>
          ))
          .filter(
            (_el, index) => index + 1 >= itemStart && index + 1 <= itemEnd,
          )}
      </ul>
    </div>
  );
};
