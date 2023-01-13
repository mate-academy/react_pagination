import React, { useState } from 'react';
import './App.css';
import { Pagination } from './components/Pagination';
import { getNumbers } from './utils';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42)
  .map(n => `Item ${n}`);

export const App: React.FC = () => {
  const defaultPage = 1;

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const maxItem = Number(itemsPerPage) * currentPage < items.length
    ? Number(itemsPerPage) * currentPage
    : items.length;

  const itemsInColumn = maxItem - ((currentPage - 1) * +itemsPerPage);
  const minValue = maxItem - itemsInColumn;
  const maxValue = itemsPerPage * currentPage;
  const displayItems = items.slice(maxValue - itemsPerPage, maxValue);

  const handlePage = (pageId: number) => {
    if (pageId !== currentPage) {
      setCurrentPage(pageId);
    }
  };

  const handlePerPage = (value: number) => {
    if (value !== itemsPerPage) {
      setItemsPerPage(value);

      setCurrentPage(defaultPage);
    }
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${minValue + 1} - ${maxItem} of ${items.length})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={itemsPerPage}
            onChange={(event) => handlePerPage(+event.target.value)}
          >
            <option value={3}>3</option>
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
          </select>
        </div>

        <label htmlFor="perPageSelector" className="col-form-label col">
          items per page
        </label>
      </div>

      <Pagination
        total={items.length}
        perPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={handlePage}
      />

      {displayItems.map(item => (
        <li
          key={item}
          data-cy="item"
        >
          {item}
        </li>
      ))}
    </div>
  );
};
