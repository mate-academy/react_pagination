import React, { useState } from 'react';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

export const App = () => {
  const totalItems = 42;
  const defaultPerPage = 5;
  const defaultPage = 1;

  const [perPage, setPerPage] = useState(defaultPerPage);
  const [currentPage, setCurrentPage] = useState(defaultPage);

  const handlePageChange = (page) => {
    if (page !== currentPage) {
      setCurrentPage(page);
    }
  };

  const handlePerPageChange = (e) => {
    setPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  const startItem = (currentPage - 1) * perPage + 1;
  const endItem = Math.min(startItem + perPage - 1, totalItems);
  const items = getNumbers(startItem, endItem);

  return (
    <div className="container">
      <h1>Items with Pagination</h1>
      <p className="lead" data-cy="info">
        Page {currentPage} (items {startItem} - {endItem} of {totalItems})
      </p>
      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={perPage}
            onChange={handlePerPageChange}>
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
      <Pagination total={totalItems} perPage={perPage} currentPage={currentPage} onPageChange={handlePageChange} />
      <ul>
        {items.map(item => (
          <li key={item} data-cy="item">Item {item}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
