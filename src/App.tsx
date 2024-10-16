import React, { useState } from 'react';

import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

const items = getNumbers(1, 42).map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [visiblePerPage, setVisiblePerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(0);
  const pages: string[][] = Array.from(
    { length: Math.ceil(items.length / visiblePerPage) },
    (_, i) =>
      items.slice(i * visiblePerPage, i * visiblePerPage + visiblePerPage),
  );
  const first = pages[currentPage].at(0);
  const last = pages[currentPage].at(-1);
  const from = first ? first.split(' ')[1] : 0;
  const to = last ? last.split(' ')[1] : 0;

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        Page {currentPage + 1} (items {from} - {to} of {items.length})
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            defaultValue={'5'}
            onChange={e => {
              setVisiblePerPage(Number(e.target.value));
              setCurrentPage(0);
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
        total={items.length}
        perPage={visiblePerPage}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
      <ul>
        {pages[currentPage].map(item => {
          return (
            <li data-cy="item" key={item}>
              {item}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default App;
