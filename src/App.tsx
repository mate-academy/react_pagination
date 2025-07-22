import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

const items = getNumbers(1, 42).map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [page, setPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(5);

  const handlePerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = Number(e.target.value);

    setPerPage(val);
    setPage(1);
  };

  const startIndex = (page - 1) * perPage;
  const endIndex = Math.min(startIndex + perPage, items.length);

  const currentItems = Array.from(
    { length: endIndex - startIndex },
    (_, i) => i + 1 + startIndex,
  );

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        Page {page} (items {currentItems[0]} -{' '}
        {currentItems[currentItems.length - 1]} of {items.length})
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            onChange={handlePerPageChange}
          >
            <option value="3">3</option>
            <option value="5" selected>
              5
            </option>
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
        perPage={perPage}
        currentPage={page}
        onPageChange={(p: number) => {
          setPage(p);
        }}
      />

      <ul>
        {currentItems.map(item => (
          <li data-cy="item" key={item}>
            Item {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
