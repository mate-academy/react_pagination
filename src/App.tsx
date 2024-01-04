import React, { useState } from 'react';
import './App.css';

import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const TOTAL = 42;
const ITEMS_PER_PAGE = [3, 5, 10, 20];

export const items = getNumbers(1, TOTAL)
  .map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [itemsOnPage, setItemsOnPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  const visibleItems = [...items];
  const startPage = (currentPage - 1) * itemsOnPage;
  const endPage = currentPage * itemsOnPage;
  const endPageTernary = endPage > TOTAL ? TOTAL : endPage;

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${startPage + 1} - ${endPageTernary} of ${TOTAL})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={itemsOnPage}
            onChange={({ target }) => setItemsOnPage(Number(target.value))}
          >
            {ITEMS_PER_PAGE.map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
        </div>

        <label htmlFor="perPageSelector" className="col-form-label col">
          items per page
        </label>
      </div>

      <Pagination
        total={TOTAL}
        perPage={itemsOnPage}
        currentPage={currentPage}
        onPageChange={(page) => setCurrentPage(page)}
      />
      <ul>
        {visibleItems
          .slice(startPage, endPage)
          .map((item) => (
            <li key={item} data-cy="item">
              {item}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default App;
