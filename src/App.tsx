import React, { ChangeEvent, useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

export const App: React.FC = () => {
  const totalAmount = 42;
  const items = getNumbers(1, 42).map(n => `Item ${n}`);
  const [value, setValue] = useState(5);
  const [sortPage, setSortPage] = useState(1);

  const handlePageChange = (page: number) => {
    setSortPage(page);
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        Page {sortPage} (items {(sortPage - 1) * value + 1} -{' '}
        {Math.min(sortPage * value, totalAmount)} of {totalAmount})
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={value}
            onChange={(e: ChangeEvent<HTMLSelectElement>) => {
              setValue(Number(e.target.value));
              setSortPage(1);
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
        total={totalAmount}
        perPage={value}
        currentPage={sortPage}
        onPageChange={handlePageChange}
      />
      <ul>
        {items
          .slice((sortPage - 1) * value, sortPage * value)
          .map((item, index) => (
            <li key={index} data-cy="item">
              {item}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default App;
