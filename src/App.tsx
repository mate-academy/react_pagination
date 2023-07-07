import React, { useState } from 'react';
import './App.css';

import { Pagination } from './components/Pagination';
import { getNumbers } from './utils';

const items = getNumbers(1, 42)
  .map(n => `Item ${n}`);

export const App: React.FC = () => {
  const total = items.length;
  const [perPage, setPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  const handlePerPageChange = (
    event:React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setPerPage(+event.target.value);
    setCurrentPage(1);
  };

  const numberOfPages = Math.ceil(total / perPage);

  const numberOfItemsOnLastPage = total - (
    numberOfPages - 1) * perPage;

  const currentItemsStart = ((currentPage - 1) * perPage);

  const currentItemsEnd = (currentPage === numberOfPages)
    ? currentItemsStart + numberOfItemsOnLastPage
    : currentPage * perPage;

  const visibleItems = items.slice(currentItemsStart, currentItemsEnd);

  const pageInfo = `Page ${currentPage} (items ${
    currentItemsStart + 1} - ${currentItemsEnd} of ${total})`;

  return (

    <div className="container">

      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {pageInfo}
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
        total={total}
        perPage={perPage}
        currentPage={currentPage}
        onPageChange={(page) => setCurrentPage(page)}
      />

      <ul>
        {
          visibleItems.map(item => (
            <li
              data-cy="item"
              key={item}
            >
              {item}
            </li>
          ))
        }

      </ul>
    </div>
  );
};

export default App;
