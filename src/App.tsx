import React, { useState } from 'react';
import './App.css';
import { Pagination } from './components/Pagination/Pagination';

enum DefaultPageValues {
  startPage = 1,
  defaultPageSize = 5,
  totalPages = 42,
}

export const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(DefaultPageValues.startPage);
  const [itemsPerPage, setPerPage] = useState(
    DefaultPageValues.defaultPageSize,
  );

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${currentPage * itemsPerPage - itemsPerPage + 1} - ${currentPage * itemsPerPage > DefaultPageValues.totalPages
          ? DefaultPageValues.totalPages
          : currentPage * itemsPerPage} of ${DefaultPageValues.totalPages})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            defaultValue={DefaultPageValues.defaultPageSize}
            onChange={(event) => {
              setPerPage(Number(event?.currentTarget.value));
              setCurrentPage(DefaultPageValues.startPage);
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
        total={DefaultPageValues.totalPages}
        perPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={(pageNumber: number) => setCurrentPage(pageNumber)}
      />
    </div>
  );
};

export default App;
