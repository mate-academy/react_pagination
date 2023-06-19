import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42)
  .map(n => `Item ${n}`);

const totalPages = 42;
const perPageSelector = [3, 5, 10, 20];

export const App: React.FC = () => {
  const [perPage, setPerPage] = useState(perPageSelector[1]);
  const [currentPage, setCurrentPage] = useState(1);

  const maxItems = currentPage * perPage;
  const firstItem = maxItems - perPage;
  const lastItem = maxItems > totalPages
    ? totalPages
    : maxItems;

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPerPage(+event.target.value);

    setCurrentPage(1);
  };

  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>
      <p
        className="lead"
        data-cy="info"
      >
        {`Page ${currentPage} (items ${firstItem + 1} - ${lastItem} of ${totalPages})`}
      </p>

      <div
        className="
           form-group
           row
         "
      >
        <div
          className="
             col-3
             col-sm-2
             col-xl-1
           "
        >
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={perPage}
            onChange={handleChange}
          >
            {perPageSelector.map(selector => (
              <option
                value={selector}
                key={selector}
              >
                {selector}
              </option>
            ))}
          </select>
        </div>

        <label
          htmlFor="perPageSelector"
          className="col-form-label col"
        >
          items per page
        </label>
      </div>

      <Pagination
        total={totalPages}
        perPage={perPage}
        currentPage={currentPage}
        onPageChange={onPageChange}
      />
      <ul>
        {items.slice(firstItem, lastItem).map(item => (
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
