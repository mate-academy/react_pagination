import React, { useEffect, useState } from 'react';
import './App.css';

import { getItems } from './utils';
import { Pagination } from './components/Pagination';

const PAGE_SIZE_OPTIONS = [3, 5, 10, 20];
const DEFAULT_PAGE_SIZE = PAGE_SIZE_OPTIONS[1];
const DEFAULT_PAGE_INDEX = 1;

export const App: React.FC = () => {
  const [items, setItems] = useState<string[]>([]);
  const [perPage, setPerPage] = useState(DEFAULT_PAGE_SIZE);
  const [currentPage, setCurrentPage] = useState(DEFAULT_PAGE_INDEX);

  useEffect(() => {
    setItems(getItems());
  }, []);

  const handleSelectChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setPerPage(+event.target.value);
    setCurrentPage(DEFAULT_PAGE_INDEX);
  };

  const startIndex = (currentPage - 1) * perPage;
  const endIndex = startIndex + perPage;
  const currentPageItems = items.slice(startIndex, endIndex);

  const totalItems = items.length;
  const itemFrom = startIndex + 1;
  const itemTo = Math.min(endIndex, totalItems);

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${itemFrom} - ${itemTo} of ${totalItems})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            id="perPageSelector"
            className="form-control"
            data-cy="perPageSelector"
            value={perPage}
            onChange={handleSelectChange}
          >
            {PAGE_SIZE_OPTIONS.map(option => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <label htmlFor="perPageSelector" className="col-form-label col">
          items per page
        </label>
      </div>

      <Pagination
        total={totalItems}
        perPage={perPage}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />

      <ul>
        {currentPageItems.map(item => (
          <li key={item} data-cy="item">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};
