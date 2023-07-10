import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42)
  .map(n => `Item ${n}`);

const FIRST_PAGE = 1;
const DEFAULT_PER_PAGE = 5;

const getVisibleItems = (perPage: number, currentPage: number) => {
  const lastIndex = perPage * currentPage;

  return items.slice(lastIndex - perPage, lastIndex);
};

export const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(FIRST_PAGE);
  const [perPage, setPerPage] = useState(DEFAULT_PER_PAGE);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPerPage(Number(event.target.value));
    setCurrentPage(FIRST_PAGE);
  };

  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  const visibleItems = getVisibleItems(perPage, currentPage);

  const firstItem = (currentPage - 1) * perPage + 1;

  const lastItem = currentPage * perPage > items.length
    ? items.length
    : currentPage * perPage;

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${firstItem} - ${lastItem} of ${items.length})`}
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
        currentPage={currentPage}
        onPageChange={onPageChange}
      />

      <ul>
        {visibleItems.map(item => (
          <li
            data-cy="item"
            key={item}
          >
            {item}
          </li>
        ))}
      </ul>

    </div>
  );
};

export default App;
