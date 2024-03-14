import React, { useState } from 'react';

import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';
import './App.css';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42).map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const totalItems = 42;

  const firstItem = perPage * (currentPage - 1);
  const lastItem = firstItem + perPage;
  const paginationFirstItem = firstItem + 1;
  const paginationLastItem = lastItem > totalItems ? totalItems : lastItem;

  const visibleItems = [...items].slice(firstItem, lastItem);

  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  const onPerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPerPage(+event.target.value);
    setCurrentPage(1);
  };

  const paginationText = `Page ${currentPage} (items ${paginationFirstItem} - ${paginationLastItem} of ${totalItems})`;

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {paginationText}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={perPage}
            onChange={onPerPageChange}
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
        total={totalItems}
        perPage={perPage}
        currentPage={currentPage}
        onPageChange={onPageChange}
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
