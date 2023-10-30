import React, { useState } from 'react';
import './App.css';

import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

const FIRST_ITEM_NUMBER = 1;
const LAST_ITEM_NUMBER = 42;

const items = getNumbers(FIRST_ITEM_NUMBER, LAST_ITEM_NUMBER)
  .map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [countVisibleItems, setCountVisibleItems] = useState(5);
  const [activePage, setActivePage] = useState(1);

  const itemsStart = countVisibleItems * activePage - countVisibleItems
    + FIRST_ITEM_NUMBER;

  const itemsFinish = countVisibleItems * activePage > LAST_ITEM_NUMBER
    ? LAST_ITEM_NUMBER
    : countVisibleItems * activePage;

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {
          `Page ${activePage} (items ${itemsStart} - ${itemsFinish} of ${LAST_ITEM_NUMBER})`
        }
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={countVisibleItems}
            onChange={event => {
              setCountVisibleItems(+event.target.value);
              setActivePage(1);
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
        items={items}
        countItemsPage={countVisibleItems}
        currentPage={activePage}
        setCurrentPage={setActivePage}
        key={items.length}
      />
    </div>
  );
};

export default App;
