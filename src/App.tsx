import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination/Pagination';

const items = getNumbers(1, 42)
  .map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [itemsPerPage, setPerPage] = useState<number>(5);
  const [currentPage, setCurrentPage] = useState(1);

  const howManyVisibleItems = itemsPerPage * currentPage - itemsPerPage + 1;

  const visibleItems = items
    .slice(howManyVisibleItems - 1, itemsPerPage * currentPage);

  const lastVisibleItem = howManyVisibleItems + visibleItems.length - 1;

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${howManyVisibleItems} - ${lastVisibleItem} of 42)`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={itemsPerPage}
            onChange={({ target }) => {
              setPerPage(+target.value);
              setCurrentPage(1);
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
        total={42}
        perPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        visibleItems={visibleItems}
      />
    </div>
  );
};

export default App;
