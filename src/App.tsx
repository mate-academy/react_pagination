import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

export const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(5);

  const items = getNumbers(1, 42).map(n => `Item ${n}`);
  const total = items.length;

  const startIndex = (currentPage - 1) * perPage + 1;
  const endIndex = Math.min(currentPage * perPage, total);
  const visibleItems = items.slice(startIndex - 1, endIndex);

  function handlePageChange(newPage: number) {
    setCurrentPage(newPage);
  }

  function handlePerPage(event: React.ChangeEvent<HTMLSelectElement>) {
    const newPage = Number(event.target.value);

    setPerPage(newPage);
    setCurrentPage(1);
  }

  return (
    <>
      <div className="container">
        <h1>Items with Pagination</h1>

        <p className="lead" data-cy="info">
          Page {currentPage} (items {startIndex} - {endIndex} of {total})
        </p>

        <div className="form-group row">
          <div className="col-3 col-sm-2 col-xl-1">
            <select
              data-cy="perPageSelector"
              id="perPageSelector"
              className="form-control"
              value={perPage}
              onChange={handlePerPage}
            >
              {['3', '5', '10', '20'].map(item => (
                <option value={item} key={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          <label htmlFor="perPageSelector" className="col-form-label col">
            items per page
          </label>
        </div>

        {/* Move this markup to Pagination */}
        <Pagination
          total={total}
          perPage={perPage}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
        <ul>
          {visibleItems.map(item => (
            <li key={item} data-cy="item">
              {item}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default App;
