import React, { useState } from 'react';
import './App.css';
import { Pagination } from './components/Pagination';
import { defaultPerPage, total } from './constants';

export const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(defaultPerPage);
  const itemsFrom = itemsPerPage * currentPage - (itemsPerPage - 1);
  const itemsTo = (itemsPerPage * currentPage) > total
    ? total
    : itemsPerPage * currentPage;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleChangePerPageValue = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setItemsPerPage(Number(event.target.value));
    handlePageChange(1);
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${itemsFrom} - ${itemsTo} of ${total})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            defaultValue={defaultPerPage}
            onChange={handleChangePerPageValue}
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
        perPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={handlePageChange}
        itemsFrom={itemsFrom}
        itemsTo={itemsTo}
      />
    </div>
  );
};
