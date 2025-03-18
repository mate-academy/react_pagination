import React, { useState } from 'react';
import './App.css';
import { Pagination } from './components/Pagination';

// eslint-disable-next-line @typescript-eslint/no-unused-vars

export const App: React.FC = () => {
  //State
  const [selectOption, setSelectOption] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const totalItems = 42;

  //Handle change
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectOption(Number(event.target.value));
    setCurrentPage(1);
  };

  //handle page change
  const handlePageChange = (page: number, pages: number) => {
    if (page !== currentPage && page > 0 && page <= pages) {
      setCurrentPage(page);
    }
  };

  // Current page items
  const startIndex = (currentPage - 1) * selectOption + 1;
  const endIndex = Math.min(startIndex + selectOption - 1, 42);

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        Page {currentPage} (items {startIndex} - {endIndex} of 42)
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={selectOption}
            onChange={handleChange}
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
        total={totalItems}
        perPage={selectOption}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default App;
