import React, { useState, useMemo } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

const TOTAL_ITEMS = 42;
const PER_PAGE_OPTIONS = [3, 5, 10, 20];
const items = getNumbers(1, TOTAL_ITEMS).map((n) => `Item ${n}`);

export const App: React.FC = () => {
  const [perPage, setPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  const firstPageIndex = (currentPage - 1) * perPage;
  const lastPageIndex = Math.min(firstPageIndex + perPage, TOTAL_ITEMS);
  const currentItems = useMemo(() => {
    return items.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, perPage]);

  function handlePerPageSelecorChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setPerPage(+e.target.value);
    setCurrentPage(1);
  }

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${firstPageIndex + 1} - ${lastPageIndex} of ${TOTAL_ITEMS})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={perPage}
            onChange={handlePerPageSelecorChange}
          >
            {PER_PAGE_OPTIONS.map((option) => (
              <option value={option} key={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <label htmlFor="perPageSelector" className="col-form-label col">
          items per page
        </label>
      </div>
      <Pagination
        total={TOTAL_ITEMS}
        perPage={perPage}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />

      {currentItems.map((item) => (
        <li data-cy="item" key={item}>
          {item}
        </li>
      ))}
    </div>
  );
};

export default App;
