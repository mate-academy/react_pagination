import React, { useState } from 'react';
import './App.css';
import { Pagination } from './components/Pagination';
import { getNumbers } from './utils';

const items = getNumbers(1, 42)
  .map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const start = (page - 1) * itemsPerPage;
  const end = page * itemsPerPage;
  const shownItems = items.slice(start, end);

  const handleSelect = (num: number) => {
    setItemsPerPage(num);
    setPage(1);
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {page === Math.ceil(items.length / itemsPerPage)
          ? `Page ${page} (items ${start + 1} - ${items.length} of ${items.length})`
          : `Page ${page} (items ${start + 1} - ${end} of ${items.length})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            onChange={e => handleSelect(+e.target.value)}
          >
            <option value="3">3</option>
            <option value="5" selected>5</option>
            <option value="10">10</option>
            <option value="20">20</option>
          </select>
        </div>

        <label
          htmlFor="perPageSelector"
          className="col-form-label col"
        >
          items per page
        </label>
      </div>

      {/* Move this markup to Pagination */}
      <Pagination
        currentPage={page}
        itemsPerPage={itemsPerPage}
        total={items.length}
        onPageChange={setPage}
      />
      <ul>
        {shownItems.map((value: string) => (
          <li
            data-cy="item"
            key={value}
          >
            {value}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
