import React, { ChangeEvent, useState } from 'react';
import './App.css';
import { getNumbers } from './utils';

import { Pagination } from './components/Pagination';

const lastNumber = 42;
const options = [3, 5, 10, 20];

const items = getNumbers(1, lastNumber)
  .map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  const start = (currentPage - 1) * itemsPerPage;
  const end = (currentPage - 1) * itemsPerPage + itemsPerPage > lastNumber
    ? lastNumber
    : (currentPage - 1) * itemsPerPage + itemsPerPage;

  const correctItems = items.slice(start, end);

  const changeVisibleItemsCount = (
    event: ChangeEvent<HTMLSelectElement>,
  ) => {
    setItemsPerPage(+event.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${start + 1} - ${end} of ${items.length})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={itemsPerPage}
            onChange={changeVisibleItemsCount}
          >
            {options.map(option => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <label htmlFor="perPageSelector" className="col-form-label col">
          items per page
        </label>
      </div>

      <Pagination
        total={items.length}
        perPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />

      <ul>
        {correctItems.map(item => (
          <li key={item} data-cy="item">{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
