import React, { useState } from 'react';
import './App.css';
import { Pagination } from './components/Pagination';
import { getNumbers } from './utils';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const totalItems = 42;
const items = getNumbers(1, totalItems).map(n => `Item ${n}`);
const itemOption = [3, 5, 10, 20];

export const App: React.FC = () => {
  const [itemsPerPage, seItemsPerPage] = useState<number>(5);
  const [currentPage, setcurrentPage] = useState<number>(1);

  const pageCount = getNumbers(1, Math.ceil(totalItems / itemsPerPage));
  const startItem = (currentPage - 1) * itemsPerPage;
  const endItem = Math.min(currentPage * itemsPerPage, items.length);
  const visibleItems: string[] = items.slice(startItem, endItem);

  function handleItemsPerPage(value: number) {
    seItemsPerPage(value);
    setcurrentPage(1);
  }

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        Page {currentPage} (items {startItem + 1} - {endItem} of {totalItems})
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={itemsPerPage}
            onChange={event => {
              handleItemsPerPage(+event.target.value);
            }}
          >
            {itemOption.map(item => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        <label htmlFor="perPageSelector" className="col-form-label col">
          items per page
        </label>
      </div>

      <Pagination
        currentPage={currentPage}
        onPageChange={setcurrentPage}
        pages={pageCount}
      />

      <ul>
        {visibleItems.map(item => (
          <li data-cy="item" key={item}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
