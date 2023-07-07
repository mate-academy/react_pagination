import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42)
  .map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(0);

  const firstItem = itemsPerPage * currentPage;

  const lastItem = Math.min(
    (currentPage + 1) * itemsPerPage,
    items.length,
  );

  const currentItems = items.slice(firstItem, lastItem);

  const onPageChange = ((page: number) => {
    setCurrentPage(page);
  });

  const changeItemPerPage = ((e: React.ChangeEvent<HTMLSelectElement>) => {
    setItemsPerPage(+e.target.value);
    setCurrentPage(0);
  });

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage + 1} (items ${(firstItem) + 1} - ${lastItem} of ${items.length})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={itemsPerPage}
            onChange={changeItemPerPage}
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
        currentItems={currentItems}
        totalItems={items}
        currentPage={currentPage}
        onPageChange={onPageChange}
        itemPerPage={itemsPerPage}
      />
    </div>
  );
};

export default App;
