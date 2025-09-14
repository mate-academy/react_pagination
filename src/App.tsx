import React, { useState } from 'react';
import './App.css';
import { Item } from './components/Item/Item';
import { Pagination } from './components/Pagination';
import { getNumbers } from './utils';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42).map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [perPage, setPerPage] = useState<number>(5);
  const [currentPage, setCurrentPage] = useState(1);

  const total = items.length;
  const displayStart = total === 0 ? 0 : (currentPage - 1) * perPage + 1;
  const displayEnd = total === 0 ? 0 : Math.min(perPage * currentPage, total);
  const start = total === 0 ? 1 : displayStart;
  const end = total === 0 ? 0 : displayEnd;

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        Page {currentPage} (items {displayStart} - {displayEnd} of {total})
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            value={perPage}
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
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

        <label htmlFor="perPageSelector" className="col-form-label col">
          items per page
        </label>
      </div>
      <Pagination
        total={total}
        perPage={perPage}
        currentPage={currentPage}
        onPageChange={(el) => setCurrentPage(el)}
      />
      <Item start={start} end={end} />
    </div>
  );
};

export default App;
