import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

const items = getNumbers(1, 42)
  .map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [perPage, setPerPage] = useState(3);
  const [activePage, setActivePage] = useState(1);
  const pagesTotal = Math.ceil(items.length / perPage);
  const firstItem = (activePage - 1) * perPage + 1;
  const lastItem = activePage === pagesTotal
    ? items.length
    : activePage * perPage;

  const visibleItems = getNumbers(firstItem, lastItem);

  const handlePerPage = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPerPage(+event.currentTarget.value);
    setActivePage(1);
  };

  const handlePageChange = (page: number) => {
    if (page <= 0 || page > pagesTotal) {
      return;
    }

    setActivePage(page);
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p
        className="lead"
        data-cy="info"
      >
        {`Page ${activePage} (items ${firstItem} - ${lastItem} of ${items.length})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            onChange={handlePerPage}
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
        total={items.length}
        perPage={perPage}
        activePage={activePage}
        onPageChange={handlePageChange}
      />
      <ul>
        {visibleItems.map((item) => (
          <li
            data-cy="item"
            key={item}
          >
            Item&nbsp;
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
