import React, { useState } from 'react';
import './App.css';
import { Pagination } from './components/Pagination';
import { getNumbers } from './utils';

const maxItems = 42;

const items = getNumbers(1, maxItems)
  .map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [activePage, setActivePage] = useState(1);

  const maxPage = (activePage - 1) * itemsPerPage + itemsPerPage > maxItems
    ? maxItems
    : (activePage - 1) * itemsPerPage + itemsPerPage;

  const visiblePages = items
    .map(el => (
      <li data-cy="item">{el}</li>
    ))
    .filter((_, i) => (
      i >= (activePage - 1) * itemsPerPage
      && i < (activePage - 1) * itemsPerPage + itemsPerPage));

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${activePage} (items ${(activePage - 1) * itemsPerPage + 1} - ${maxPage} of ${maxItems})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={itemsPerPage}
            onChange={(event) => {
              setItemsPerPage(Number(event.target.value));
              setActivePage(1);
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

      <Pagination
        total={maxItems}
        perPage={itemsPerPage}
        currentPage={activePage}
        onPageChange={(page) => {
          setActivePage(page);
        }}
      />
      <ul>
        {visiblePages}
      </ul>
    </div>
  );
};

export default App;
