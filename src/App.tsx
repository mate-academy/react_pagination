import React, { useState } from 'react';
import './App.css';
import { Pagination } from './components/Pagination';

const TOTAL = 42;

export const App: React.FC = () => {
  const [perPage, setPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${currentPage} - ${currentPage + perPage - 1 > TOTAL
          ? TOTAL
          : currentPage + perPage - 1} of ${TOTAL})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            defaultValue={5}
          >
            <option
              value="3"
              onClick={() => {
                setPerPage(3);
                setCurrentPage(1);
              }}
            >
              3
            </option>
            <option
              value="5"
              onClick={() => {
                setPerPage(5);
                setCurrentPage(1);
              }}
            >
              5
            </option>
            <option
              value="10"
              onClick={() => {
                setPerPage(10);
                setCurrentPage(1);
              }}
            >
              10
            </option>
            <option
              value="20"
              onClick={() => {
                setPerPage(20);
                setCurrentPage(1);
              }}
            >
              20
            </option>
          </select>
        </div>
        <label htmlFor="perPageSelector" className="col-form-label col">
          items per page
        </label>
      </div>

      <Pagination
        total={TOTAL}
        perPage={perPage}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default App;
