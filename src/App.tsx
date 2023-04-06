import React, { useMemo, useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

const items = getNumbers(1, 42)
  .map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const startIndex = useMemo(() => itemsPerPage * (page - 1) + 1,
    [itemsPerPage, page]);
  const endIndex = useMemo(() => (itemsPerPage * page > items.length
    ? items.length
    : itemsPerPage * page), [itemsPerPage, page]);
  const visibleItems = useMemo(() => items.slice(startIndex - 1, endIndex),
    [items, startIndex, endIndex]);

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        { `Page ${page} (items ${startIndex} - ${endIndex} of ${items.length})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            value={itemsPerPage}
            onChange={(e) => {
              setPage(1);
              setItemsPerPage(+e.target.value);
            }}
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

      <Pagination
        total={items.length}
        perPage={itemsPerPage}
        currentPage={page}
        onPageChange={setPage}
      />
      <ul>
        {visibleItems.map(item => (
          <li data-cy="item">{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
