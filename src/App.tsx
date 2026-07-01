import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42).map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(5);

  const firstItemIndex = (currentPage - 1) * perPage;
  const lastItemIndex = firstItemIndex + perPage;

  const visibleItems = items.slice(firstItemIndex, lastItemIndex);

  return (
    <div className="container">
      <h1>Items</h1>

      <p data-cy="info">
        Page {currentPage} (items {firstVisibleItem} - {lastVisibleItem} of {items.length})
      </p>

      <div className="field">
        <label className="label" htmlFor="perPageSelector">
          Items per page
        </label>

        <div className="control">
          <div className="select">
            <select
              id="perPageSelector"
              data-cy="perPageSelector"
              value={perPage}
              onChange={event => {
                setPerPage(Number(event.target.value));
                setCurrentPage(1);
              }}
            >
              <option value="3">3</option>
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">20</option>
            </select>
          </div>
        </div>
      </div>

      <ul>
        {visibleItems.map(item => (
          <li key={item}>
            {item}
          </li>
        ))}
      </ul>

      <Pagination
        total={items.length}
        perPage={perPage}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};
export default App;
