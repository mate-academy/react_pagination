import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

const items = getNumbers(1, 42).map(n => `Item ${n}`);
const currentPageDefault = 1;
const perPageDefault = 5;
const total = items.length;

export const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(currentPageDefault);
  const [perPage, setPerPage] = useState(perPageDefault);

  const startItem = (currentPage - 1) * perPage + 1;
  const endItem = Math.min(startItem + perPage - 1, total);

  const sliceStartIndex = (currentPage - 1) * perPage;
  const sliceEndIndex = sliceStartIndex + perPage;
  const selectedItems = items.slice(sliceStartIndex, sliceEndIndex);

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        Page {currentPage} (items {startItem} - {endItem} of {total})
      </p>

      <div className="form-group row align-items-center gap-2">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control py-[15px]"
            value={perPage}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
              setCurrentPage(1);
              setPerPage(Number(e.target.value));
            }}
          >
            <option value="3">3</option>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
          </select>
        </div>
        <span>items per page</span>
      </div>

      <Pagination
        total={total}
        perPage={perPage}
        currentPage={currentPage}
        onPageChange={page => setCurrentPage(page)}
      />

      <ul>
        {selectedItems.map((item, index) => (
          <li key={index} data-cy="item">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};
