import React, { useState } from 'react';
import './App.css';
import { Pagination } from './components/Pagination';

export const App: React.FC = () => {
  const [perPage, setPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const handlePageChange = (newPage: number) => {
    if (newPage !== currentPage) {
      setCurrentPage(newPage);
    }
  };

  const startIndex = (currentPage - 1) * perPage + 1;

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${startIndex} - ${Math.min(startIndex + perPage - 1, 42)} of 42)`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            onChange={ev => {
              setPerPage(+ev.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="3">3</option>
            <option value="5" selected>
              5
            </option>
            <option value="10">10</option>
            <option value="20">20</option>
          </select>
        </div>

        <label htmlFor="perPageSelector" className="col-form-label col">
          items per page
        </label>
      </div>
      <Pagination
        current={currentPage}
        perPage={perPage}
        total={42}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default App;
