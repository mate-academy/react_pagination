import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42).map(n => `Item ${n}`);

type PerPage = 3 | 5 | 10 | 20;

export const App: React.FC = () => {
  const [perPage, setPerPage] = useState<PerPage>(5);
  const [currentPage, setCurrentPage] = useState(1);

  const handlePerPageChange = (newItemsPerPage: PerPage) => {
    setPerPage(newItemsPerPage);
    setCurrentPage(1);
  };

  const options = [3, 5, 10, 20];
  const totalItems = items.length;
  const firstItemIndex = (currentPage - 1) * perPage + 1;
  const lastItemIndex = Math.min(currentPage * perPage, totalItems);
  const paginatedItems = items.slice(firstItemIndex - 1, lastItemIndex);

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        Page {currentPage} (items {firstItemIndex} - {lastItemIndex} of{' '}
        {totalItems})
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={perPage}
            onChange={event => {
              const newItemsPerPage = Number(event.target.value) as PerPage;

              handlePerPageChange(newItemsPerPage);
            }}
          >
            {options.map(option => {
              return (
                <option value={option} key={option}>
                  {option}
                </option>
              );
            })}
          </select>
        </div>

        <label htmlFor="perPageSelector" className="col-form-label col">
          items per page
        </label>
      </div>

      <Pagination
        total={totalItems}
        perPage={perPage}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />

      <ul>
        {paginatedItems.map(item => {
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
