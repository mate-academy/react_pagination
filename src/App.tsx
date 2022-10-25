import React, { useState } from 'react';
import './App.css';
import { Pagination } from './components/Pagination';
import { getNumbers } from './utils';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const total = 42;
const items = getNumbers(1, total)
  .map(n => `Item ${n}`);
const options = [3, 5, 10, 20];

export const App: React.FC = () => {
  const [perPage, setPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const firstItemOnPage = 1 + (currentPage - 1) * perPage;
  const lastItemOnPage = currentPage * perPage > total
    ? total
    : currentPage * perPage;

  const handleOptions = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPerPage(+e.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${firstItemOnPage} - ${lastItemOnPage} of ${total})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={perPage}
            onChange={(e) => handleOptions(e)}
          >
            {options.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
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
        onPageChange={setCurrentPage}
      />
      <ul>
        {items.map((item, index) => {
          if (index >= (currentPage - 1) * perPage
            && index < currentPage * perPage) {
            return (
              <li key={item} data-cy="item">{item}</li>
            );
          }

          return null;
        })}
      </ul>
    </div>
  );
};

export default App;
