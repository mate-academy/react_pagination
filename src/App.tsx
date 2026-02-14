import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42).map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [amount, setAmount] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const total = 42;
  const end = Math.min(currentPage * amount, total);
  const start = amount * (currentPage - 1) + 1;

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        Page {currentPage} (items {start} - {end} of {total})
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={amount}
            onChange={e => {
              setAmount(Number(e.target.value));
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
        total={total}
        perPage={amount}
        currentPage={currentPage}
        onPageChange={newPage => {
        setCurrentPage(newPage);
        setSearchParams({ page: String(newPage), perPage: String(amount) });
        }}
      />
      <ul>
        {getNumbers(start, end).map(n => (
          <li key={n} data-cy="item">
            Item {n}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
