import React, { ChangeEvent, useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

const items = getNumbers(1, 42)
  .map(n => `Item ${n}`);

const DEFAULT_PER_PAGE = 5;
const DEFAULT_CURRENT_PAGE = 1;

export const App: React.FC = () => {
  const [perPage, setPerPage] = useState(DEFAULT_PER_PAGE);
  const [currentPage, setCurrentPage] = useState(DEFAULT_CURRENT_PAGE);

  const totalItems = items.length;
  const firstItemOnPage = (perPage * currentPage) - perPage + 1;
  const lastItemOnPage = perPage * currentPage;
  const visibleItems = [...items.slice(firstItemOnPage - 1, lastItemOnPage)];

  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const value = Number(event.target.value);

    setPerPage(value);
    setCurrentPage(DEFAULT_CURRENT_PAGE);
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${firstItemOnPage} - ${lastItemOnPage > totalItems ? totalItems : lastItemOnPage} of ${totalItems})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            onChange={handleSelectChange}
            value={perPage}
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
          <li data-cy="item">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
