import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42).map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [itemsPerPage, setItemsPerPage] = useState<number>(5);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const startNumber = (currentPage - 1) * itemsPerPage + 1;
  const numbersOnPage: number[] = (() => {
    const allNumbers: number[] = [];

    for (let i = startNumber; i <= items.length; i++) {
      if (allNumbers.length < itemsPerPage) {
        allNumbers.push(i);
      }
    }

    return allNumbers;
  })();

  const handlePageChange = (page: number) => {
    if (page !== currentPage) {
      setCurrentPage(page);
    }
  };

  const handleItemsPerPageValue = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    if (+event.target.value !== itemsPerPage) {
      setItemsPerPage(+event.target.value);
      setCurrentPage(1);
    }
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        Page {currentPage} (items {startNumber} -{' '}
        {numbersOnPage[numbersOnPage.length - 1]} of 42)
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={itemsPerPage}
            onChange={handleItemsPerPageValue}
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
        perPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
      <ul>
        {numbersOnPage.map(number => (
          <li data-cy="item" key={number}>
            Item {number}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
