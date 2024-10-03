import React, { useState } from 'react';

import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

const TOTAL_ITEMS = 42;

const options = [3, 5, 10, 20];

export const App: React.FC = () => {
  const [perPageCount, setPerPageCount] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  const firstItemIndexOnPage = (currentPage - 1) * perPageCount;

  const lastItemIndexOnPage = firstItemIndexOnPage + perPageCount;

  const amountOfItems = getNumbers(
    firstItemIndexOnPage + 1,
    lastItemIndexOnPage,
  ).filter(number => number <= TOTAL_ITEMS);

  const visibleItems = amountOfItems.map(number => `Item ${number}`);

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
            onChange={handleChangeOption}
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
        total={TOTAL_ITEMS}
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
