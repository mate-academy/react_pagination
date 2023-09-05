import React, { useState } from 'react';
import './App.css';
import { Pagination } from './components/Pagination';

const totalItems = 42;

export const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const firstItemOnPage = ((currentPage - 1) * itemsPerPage) + 1;
  const lastItemOnPage = Math.min(
    totalItems, firstItemOnPage + itemsPerPage - 1,
  );
  const hadlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${firstItemOnPage} - ${lastItemOnPage} of ${totalItems})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            onChange={(event) => {
              setItemsPerPage(+event.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="3">3</option>
            <option value="5" selected>5</option>
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
        currentPage={currentPage}
        perPage={itemsPerPage}
        handlePageChange={hadlePageChange}
      />
    </div>
  );
};
