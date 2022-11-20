import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

const startValue = 1;
const total = 42;
const items = getNumbers(startValue, total).map(n => `Item ${n}`);
const options = [3, 5, 10, 20];

export const App: React.FC = () => {
  const [perPage, setPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(startValue);
  const firstPageItem = startValue + (currentPage - startValue) * perPage;

  const lastPageItem = currentPage * perPage > total
    ? total
    : currentPage * perPage;

  const handleOptions = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPerPage(+event.target.value);
    setCurrentPage(startValue);
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${firstPageItem} - ${lastPageItem} of ${total})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={perPage}
            onChange={(event) => handleOptions(event)}
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
        startValue={startValue}
        total={total}
        perPage={perPage}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />

      <ul>
        {items.map((item, index) => {
          const isFirstItem = index >= (currentPage - startValue) * perPage;
          const isLastItem = index < currentPage * perPage;

          if (isFirstItem && isLastItem) {
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
