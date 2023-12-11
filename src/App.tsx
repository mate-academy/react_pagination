import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42)
  .map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(5);

  const totalItems = items.length;

  const handlePageChange = (
    page: number,
  ) => {
    setCurrentPage(page);
  };

  const handlePerPageChange = (
    changeEvent: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const newPerPage = parseInt(changeEvent.target.value, 10);

    setPerPage(newPerPage);
    setCurrentPage(1);
  };

  const calculateStartItem = () => {
    return (currentPage - 1) * perPage + 1;
  };

  const calculateEndItem = () => {
    return Math.min(currentPage * perPage, totalItems);
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${calculateStartItem()} - ${calculateEndItem()} of ${totalItems})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={perPage}
            onChange={handlePerPageChange}
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

      {/* Move this markup to Pagination */}
      <Pagination
        total={totalItems}
        perPage={perPage}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />

    </div>
  );
};

export default App;
