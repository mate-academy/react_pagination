import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42)
  .map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const numberOfItems = items.length;
  const firstDisplayedItem = currentPage * itemsPerPage - itemsPerPage + 1;
  const lastDisplayedItem = currentPage * itemsPerPage;
  const visibleItems = items.slice(firstDisplayedItem - 1, lastDisplayedItem);

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${firstDisplayedItem} - ${lastDisplayedItem} of ${numberOfItems})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={itemsPerPage}
            onChange={e => setItemsPerPage(Number(e.target.value))}
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
        total={numberOfItems}
        perPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
      <ul>
        {
          visibleItems.map((item) => (
            <li key={item} data-cy="item">{item}</li>
          ))
        }
      </ul>
    </div>
  );
};
