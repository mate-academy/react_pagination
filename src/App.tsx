import React, { useState } from 'react';
import './App.css';
import { PaginationInterface } from './components/Pagination/types';
import { Pagination } from './components/Pagination';

export const App: React.FC = () => {
  const [pagination, setPagination] = useState<PaginationInterface>({
    total: 42,
    perPage: 5,
    currentPage: 1,
    onPageChange: page =>
      setPagination(prev => {
        return {
          ...prev,
          currentPage:
            page <= Math.ceil(pagination.total / pagination.perPage)
              ? page
              : pagination.currentPage,
        };
      }),
  });

  const startIndex =
    ((pagination.currentPage || 1) - 1) * pagination.perPage + 1;
  const endIndex = Math.min(
    startIndex + pagination.perPage - 1,
    pagination.total,
  );

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${pagination.currentPage} (items ${startIndex} - ${endIndex} of ${pagination.total})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            defaultValue="5"
            onChange={event => {
              const selectedValue = Number(event.target.value);

              setPagination(prev => ({
                ...prev,
                perPage: selectedValue,
                currentPage: 1,
              }));
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

      <Pagination pagination={pagination} />
    </div>
  );
};

export default App;
