import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

const items = getNumbers(1, 42).map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [num, setNum] = useState<number>(5);
  const [page, setPage] = useState(1);

  const startItem = (page - 1) * num + 1;
  const endItem = Math.min(page * num, items.length);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setNum(Number(event.target.value));
    setPage(1);
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        Page {page} (items {startItem} - {endItem} of {items.length})
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            onChange={handleSelectChange}
            value={num}
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
        items={items}
        perPage={num}
        currentPage={page}
        changePage={setPage}
      />
    </div>
  );
};

export default App;
