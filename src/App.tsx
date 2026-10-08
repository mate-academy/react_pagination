import React, { useState } from "react";
import { Pagination } from "./Pagination/Pagination";
import './App.css';

const items = Array.from({ length: 42 }, (_, index) => `Item ${index + 1}`);

export const App: React.FC = () => {
  const [perPage, setPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  const start = (currentPage - 1) * perPage;
  const visibleItems = items.slice(start, start + perPage);
  const firstItem = start + 1;
  const lastItem = start + visibleItems.length;
  const info = `Page ${currentPage} (items ${firstItem} - ${lastItem} of ${items.length})`;

  const handlePerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPerPage(Number(event.target.value));
    setCurrentPage(1);
  };

  return (
    <div className="app">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {info}
      </p>

      <div className="per-page">
        <select
          data-cy="perPageSelector"
          id="perPageSelector"
          value={perPage}
          onChange={handlePerPageChange}
        >
          <option value="3">3</option>
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
        </select>

        <label htmlFor="perPageSelector">items per page</label>
      </div>

      <Pagination
        total={items.length}
        perPage={perPage}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />

      <ul className="items">
        {visibleItems.map((item) => (
          <li data-cy="item" key={item}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};
