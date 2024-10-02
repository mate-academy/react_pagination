import React, { useState } from 'react';

import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

const options = [3, 5, 10, 20];

export const App: React.FC = () => {
  const [perPageCount, setPerPageCount] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  const totalItems = 42;

  const firstItemOnPage = (currentPage - 1) * perPageCount;

  const lastItemOnPage = firstItemOnPage + perPageCount;

  const amountOfItems = getNumbers(1, 42).filter(
    a => a >= firstItemOnPage + 1 && a <= lastItemOnPage,
  );

  const visibleItems = amountOfItems.map(n => `Item ${n}`);

  const handleChangeOption = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPerPageCount(+event.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${amountOfItems[0]} - ${amountOfItems[amountOfItems.length - 1]} of 42)`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={perPageCount}
            onChange={event => handleChangeOption(event)}
          >
            {options.map(option => (
              <option key={option} value={`${option}`}>
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
        total={totalItems}
        perPage={perPageCount}
        currentPage={currentPage}
        onPageChange={(page: number) => setCurrentPage(page)}
      />

      <ul>
        {visibleItems.map(item => (
          <li data-cy="item" key={item}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
