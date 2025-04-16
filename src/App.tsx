import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

const numbers = getNumbers(1, 42);
const items = numbers.map(number => `Item ${number}`);

export const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(5);

  const firstItemIndex = (currentPage - 1) * itemsPerPage;
  const lastItemIndex = Math.min(firstItemIndex + itemsPerPage, items.length);
  const currentItems = items.slice(firstItemIndex, lastItemIndex);

  const itemsPerPageOptions: number[] = [3, 5, 10, 20];

  const handlePageChange = (page: number): void => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
  ): void => {
    const selectedValue = parseInt(e.target.value, 10);

    setItemsPerPage(selectedValue);
    setCurrentPage(1);
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        Page {currentPage} (items {firstItemIndex + 1} - {lastItemIndex} of{' '}
        {items.length})
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
            {itemsPerPageOptions.map(option => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <label htmlFor="perPageSelector" className="col-form-label col">
          Items per page
        </label>
      </div>

      <Pagination
        total={items.length}
        perPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />

      <ul>
        {currentItems.map(item => (
          <li key={item} data-cy="item">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
