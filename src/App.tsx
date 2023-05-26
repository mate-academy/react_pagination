import React, { useEffect, useState } from 'react';
import './App.css';
import { Pagination } from './components/Pagination';
import {
  pagesAmount,
  fromPageNumber,
  toPageNumber,
} from './utils';

const total = 42;

export const App: React.FC = () => {
  const [perPage, setPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  const onPageChange = (page: number) => {
    if (page >= 1 && page <= pagesAmount(total, perPage)) {
      setCurrentPage(page);
    }
  };

  useEffect(() => {}, [perPage, currentPage]);

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${fromPageNumber(perPage, currentPage)} - ${toPageNumber(total, perPage, currentPage)} of ${total})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            value={perPage}
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            onChange={(event) => {
              setPerPage(+event.currentTarget.value);
              setCurrentPage(1);
            }}
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
        total={total}
        perPage={perPage}
        currentPage={currentPage}
        onPageChange={onPageChange}
      />
    </div>
  );
};

export default App;
