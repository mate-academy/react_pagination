import React, { useState } from 'react';

import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

const MAX_ITEMS = 42;

const items = getNumbers(1, MAX_ITEMS)
  .map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [itemsOnPage, setItemsOnPage] = useState(5);
  const [selectedPage, setSelectedPage] = useState(1);

  const perPage = [3, 5, 10, 20];
  const startIndexItems = selectedPage * itemsOnPage - itemsOnPage;
  const lastIndexItems = Math.min(selectedPage * itemsOnPage, MAX_ITEMS);
  const preparedItems = items.slice(startIndexItems, lastIndexItems);

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${selectedPage} (items ${startIndexItems + 1} - ${lastIndexItems} of ${MAX_ITEMS})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            value={itemsOnPage}
            onChange={(event) => {
              setItemsOnPage(parseInt(event.target.value, 10));
              setSelectedPage(1);
            }}
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
          >
            {perPage.map(value => (
              <option key={value} value={value}>
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
        total={MAX_ITEMS}
        perPage={itemsOnPage}
        currentPage={selectedPage}
        onPageChange={setSelectedPage}
      />

      <ul>
        {preparedItems.map(item => (
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
