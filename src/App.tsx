import React, { useState } from 'react';
import './App.css';
import Pagination from './components/Pagination/Pagination';

const itemsPerPageOptions = [3, 5, 10, 20];

const getNumbers = (start: number, end: number) => {
  const numbers = [];
  // eslint-disable-next-line
  for (let i = start; i <= end; i++) {
    numbers.push(i);
  }

  return numbers;
};

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const totalItems = 42;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange
  = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  const startIndex = (currentPage - 1) * itemsPerPage + 1;
  const endIndex = Math.min(startIndex + itemsPerPage - 1, totalItems);

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        Page
        {' '}
        {currentPage}
        {' '}
        (items
        {' '}
        {startIndex}
        {' '}
        -
        {endIndex}
        {' '}
        of
        {' '}
        {totalItems}
        {' '}
        )
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={itemsPerPage}
            onChange={handleItemsPerPageChange}
          >
            {itemsPerPageOptions.map((option) => (
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
        total={totalItems}
        perPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
      <ul>
        {getNumbers(startIndex, endIndex).map((n) => (
          <li data-cy="item" key={n}>
            Item
            {' '}
            {n}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
