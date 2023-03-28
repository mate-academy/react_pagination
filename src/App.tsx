import React, { useState } from 'react';
import './App.css';
import { Pagination } from './components/Pagination';
import { getNumbers } from './utils';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42)
  .map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [total] = useState(42);
  const [itemPerPage, setItemPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  const changePage = (page: number) => {
    setCurrentPage(page);
  };

  const changeItemsPerPage = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setItemPerPage(+event.target.value);
    setCurrentPage(1);
  };

  const currentPageLastIndex = currentPage * itemPerPage;
  const firstItem = currentPageLastIndex - itemPerPage + 1;
  const lastItem = currentPageLastIndex <= total
    ? currentPageLastIndex
    : total;

  const visibleItems = items.slice(firstItem - 1, lastItem);

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${firstItem} - ${lastItem} of ${total})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={itemPerPage}
            onChange={changeItemsPerPage}
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
        total={total}
        perPage={itemPerPage}
        currentPage={currentPage}
        onPageChange={changePage}
      />

      <ul>
        {visibleItems.map(visibleItem => (
          <li data-cy="item" key={visibleItem}>
            {visibleItem}
          </li>
        ))}
      </ul>
    </div>
  );
};
