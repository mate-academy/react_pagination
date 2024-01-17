import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { PaginationRules } from './types/PaginationRules';
import { Pagination } from './components/Pagination';

const items = getNumbers(1, 42)
  .map(n => `Item ${n}`);

const DEFAULT_PAGINATION_RULES: PaginationRules = {
  perPage: 5,
  currentPage: 1,
  total: items.length,
};

const ITEMS_PER_PAGE_OPTIONS = [3, 5, 10, 20];

export const App: React.FC = () => {
  const [paginationRules, setPaginationRules]
    = useState<PaginationRules>(DEFAULT_PAGINATION_RULES);
  const itemsStartNumber
    = (paginationRules.currentPage - 1) * paginationRules.perPage + 1;
  const itemsEndNumber
    = Math.min((
      paginationRules.currentPage - 1)
      * paginationRules.perPage + paginationRules.perPage,
    items.length);

  const handleOnChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPaginationRules({
      ...paginationRules,
      perPage: +event.target.value,
      currentPage: 1,
    });
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${paginationRules.currentPage} (items ${itemsStartNumber} - ${itemsEndNumber} of ${paginationRules.total})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={paginationRules.perPage}
            onChange={handleOnChange}
          >
            {ITEMS_PER_PAGE_OPTIONS.map(number => (
              <option value={number} key={number}>
                {number}
              </option>
            ))}
          </select>
        </div>

        <label htmlFor="perPageSelector" className="col-form-label col">
          items per page
        </label>
      </div>

      <Pagination
        paginationRules={paginationRules}
        items={items}
        onPageChanged={setPaginationRules}
      />
    </div>
  );
};

export default App;
