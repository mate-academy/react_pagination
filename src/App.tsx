import React, { useState } from 'react';
import './App.css';
import { Pagination } from './components/Pagination';
import { items } from './items';

export const App: React.FC = () => {
  const total = items.length;
  const [perPage, setPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const startItem = perPage * currentPage - perPage;
  const endItem = perPage * (currentPage + 1) - perPage;

  const itemsOnPage = (): string[] => {
    return items
      .filter((i, index) => index >= startItem && index < endItem && i);
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${startItem + 1} - ${startItem + itemsOnPage().length} of ${total})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={perPage}
            onChange={event => {
              setCurrentPage(1);
              setPerPage(parseInt(event.target.value, 10));
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
        onPageChange={(v) => {
          setCurrentPage(v);
        }}
      />

      <ul>
        {itemsOnPage().map(item => (
          <li data-cy="item">{item}</li>
        ))}
      </ul>
    </div>
  );
};
