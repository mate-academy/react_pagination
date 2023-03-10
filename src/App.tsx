import React, { useState } from 'react';
import './App.css';
import { Pagination } from './components/Pagination';
import { getNumbers } from './utils';

const items = getNumbers(1, 42)
  .map(n => `Item ${n}`);

const calculateVisibleItems = (perPage: number, currentPage: number) => {
  const indexLast = perPage * currentPage;

  return items.slice(indexLast - perPage, indexLast);
};

const getNumber = (itemText: string): string => {
  return itemText.slice(5);
};

export const App: React.FC = () => {
  const [total] = useState(items.length);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPageValues = [3, 5, 10, 20];
  const visibleItems = calculateVisibleItems(itemsPerPage, currentPage);

  const firstItemOnPage = getNumber(visibleItems[0]);
  const lastItemOnPage = getNumber(visibleItems[visibleItems.length - 1]);

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${firstItemOnPage} - ${lastItemOnPage} of ${total})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={itemsPerPage}
            onChange={(event) => {
              setItemsPerPage(+event.target.value);
              setCurrentPage(1);
            }}
          >
            {itemsPerPageValues.map((number) => (
              <option
                value={number}
                key={number}
              >
                {number}
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
        perPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />

      <ul>
        {visibleItems.map(item => (
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
