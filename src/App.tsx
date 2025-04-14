import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

export const App: React.FC = () => {
  const total = 42;
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const items: string[] = getNumbers(1, total).map(n => `Item ${n}`);

  const signaturePage = (
    numberPage: number,
    availableItems: number,
    allItems: number,
  ) => {
    return (
      <p className="lead" data-cy="info">
        {`Page ${numberPage} (items ${(numberPage - 1) * availableItems + 1} - ${Math.min(numberPage * availableItems, allItems)} of ${allItems})`}
      </p>
    );
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  const visibleItems = (
    allItems: string[],
    visiblePage: number,
    countItems: number,
  ) => {
    return (
      <ul>
        {allItems
          .slice((visiblePage - 1) * countItems, visiblePage * countItems)
          .map(item => (
            <li key={item} data-cy="item">
              {item}
            </li>
          ))}
      </ul>
    );
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      {signaturePage(currentPage, itemsPerPage, total)}

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={itemsPerPage}
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

      <Pagination
        total={total}
        perPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />

      {visibleItems(items, currentPage, itemsPerPage)}
    </div>
  );
};
