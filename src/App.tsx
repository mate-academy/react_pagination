import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

const TOTAL_ITEMS = 42;
const ALL_OPTIONS = [3, 5, 10, 20];
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, TOTAL_ITEMS).map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  const itemStartPage = itemsPerPage * currentPage - itemsPerPage + 1;
  let itemEndPage = itemsPerPage * currentPage;

  if (itemEndPage > TOTAL_ITEMS) {
    itemEndPage = TOTAL_ITEMS;
  }

  const changeItemsPerPage = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setItemsPerPage(+event.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        Page {currentPage} (items {itemStartPage} - {itemEndPage} of{' '}
        {TOTAL_ITEMS})
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={itemsPerPage}
            onChange={event => changeItemsPerPage(event)}
          >
            {ALL_OPTIONS.map(number => (
              <option key={number} value={number}>
                {number}
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
        onPageChange={num => setCurrentPage(num)}
      />

      <ul>
        {items
          .map((item, i) => (
            <li key={i} data-cy="item">
              {item}
            </li>
          ))
          .filter(
            (_el, index) =>
              index + 1 >= itemStartPage && index + 1 <= itemEndPage,
          )}
      </ul>
    </div>
  );
};

export default App;
