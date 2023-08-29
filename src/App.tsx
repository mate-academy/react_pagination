import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

const total = 42;
const items = getNumbers(1, total)
  .map(n => `Item ${n}`);
const optionNumbers = [3, 5, 10, 20];

export const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const firstItem = (currentPage - 1) * perPage + 1;
  const lastItem = Math.min(currentPage * perPage, 42);

  const visibleElements = () => {
    const firstPageIndex = (currentPage - 1) * perPage;
    const lastPageIndex = firstPageIndex + perPage;

    return items.slice(firstPageIndex, lastPageIndex);
  };

  const visibleElems = visibleElements();

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
            value={perPage}
            onChange={(event) => {
              setPerPage(parseInt(event.target.value, 10));
              setCurrentPage(1);
            }}
          >
            {optionNumbers.map((option) => (
              <option key={option} value={option}>
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
        total={total}
        perPage={perPage}
        currentPage={currentPage}
        onPageChange={(page: number) => setCurrentPage(page)}
      />
      {visibleElems.map((item) => (
        <ul key={item}>
          <li data-cy="item">{item}</li>
        </ul>
      ))}
    </div>
  );
};

export default App;
