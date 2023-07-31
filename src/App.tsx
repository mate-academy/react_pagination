import React, { useState } from 'react';
import './App.css';
import { Pagination } from './components/Pagination';

import { getNumbers } from './utils';

const TOTAL_PAGES = 42;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, TOTAL_PAGES);

export const App: React.FC = () => {
  const [itemsOnPage, setItemsOnPage] = useState(3);
  const [activePage, setActivePage] = useState(1);

  const firstItem = itemsOnPage * activePage - itemsOnPage;
  const currentItems = [...items].splice(firstItem, itemsOnPage);
  const firstCurrentItem = currentItems[0];
  const lastCurrentItem = currentItems[currentItems.length - 1];

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${activePage} (items ${firstCurrentItem} - ${lastCurrentItem} of ${TOTAL_PAGES})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            onChange={(event) => {
              setItemsOnPage(+event.currentTarget.value);
              setActivePage(1);
            }}
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

      {/* Move this markup to Pagination */}
      <Pagination
        total={TOTAL_PAGES}
        perPage={itemsOnPage}
        currentPage={activePage}
        onPageChange={(page) => setActivePage(page)}
      />

      <ul>
        {currentItems.map(item => (
          <li data-cy="item" key={item}>{`Item ${item}`}</li>
        ))}

      </ul>
    </div>
  );
};

export default App;
