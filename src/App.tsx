import React, { useEffect, useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

export const App: React.FC = () => {
  const items = getNumbers(1, 42).map(n => `Item ${n}`);
  const [perPage, setPerPage] = useState<number>(5);
  const [currentPage, setCurrentPage] = useState<number>(1);

  //Reset the current page to 1 whenever the items per page changes.
  useEffect(() => {
    setCurrentPage(1);
  }, [perPage]);

  const total = items.length;
  const lastItemIndex = currentPage * perPage;
  const firstItemIndex = lastItemIndex - perPage;
  const currentItems = items.slice(firstItemIndex, lastItemIndex);

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        Page {currentPage} (items {firstItemIndex + 1} -{' '}
        {Math.min(lastItemIndex, total)} of {total})
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            value={perPage}
            onChange={event => setPerPage(Number(event.target.value))}
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
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
        arrItems={currentItems}
        total={total}
        perPage={perPage}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
      />
    </div>
  );
};

export default App;
