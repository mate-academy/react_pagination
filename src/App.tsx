import React, { useState } from 'react';

import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

import './App.css';

const items = getNumbers(1, 42)
  .map(n => `Item ${n}`);

const selectValues = [3, 5, 10, 20];

export const App: React.FC = () => {
  const [itemsPerPageValue, setItemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  const firstItemOnPage = itemsPerPageValue * (currentPage - 1) + 1;
  const lastItemOnPage
    = Math.min(itemsPerPageValue * currentPage, items.length);

  const itemsOnPage = getNumbers(firstItemOnPage, lastItemOnPage).map(n => `Item ${n}`);

  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${firstItemOnPage} - ${lastItemOnPage} of ${items.length})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={itemsPerPageValue}
            onChange={(event) => {
              setItemsPerPage(+event.target.value);
            }}
          >
            {selectValues.map((value: number) => (
              <option
                key={value}
                value={value}
              >
                {value}
              </option>
            ))}
          </select>
        </div>

        <label htmlFor="perPageSelector" className="col-form-label col">
          items per page
        </label>
      </div>

      <Pagination
        total={items.length}
        PerPage={itemsPerPageValue}
        currentPage={currentPage}
        onPageChange={onPageChange}
      />

      <ul>
        {itemsOnPage.map((item) => (
          <li data-cy="item">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
