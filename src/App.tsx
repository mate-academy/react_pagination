import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

const items = getNumbers(1, 42).map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [perPage, setPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const shownItems: string[] = [];

  for (let i = 0; i < perPage; i++) {
    if (currentPage !== 1) {
      shownItems.push(items[perPage * (currentPage - 1) + i]);
    } else {
      shownItems.push(items[i]);
    }
  }

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        Page {currentPage} (items {items.indexOf(shownItems[0]) + 1} -{' '}
        {items.indexOf(shownItems[perPage - 1]) + 1 === 0
          ? items.length
          : items.indexOf(shownItems[perPage - 1]) + 1}{' '}
        of {items.length})
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            defaultValue={perPage}
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            onChange={event => {
              setPerPage(+event.target.value);
              setCurrentPage(1);
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

      {/* Move this markup to Pagination */}
      <Pagination
        total={items.length}
        perPage={perPage}
        currentPage={currentPage}
        onPageChange={(page: number) =>
          page !== currentPage && setCurrentPage(page)
        }
      />

      <ul>
        {shownItems.map(
          a =>
            a !== undefined && (
              <li data-cy="item" key={a}>
                {a}
              </li>
            ),
        )}
      </ul>
    </div>
  );
};

export default App;
