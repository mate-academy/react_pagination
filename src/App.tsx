import React, { useState } from 'react';
import './App.css';
import { Pagination } from './components/Pagination';
import { items, itemsCountPerPage } from './utils';

export const App: React.FC = () => {
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  const firstItemIndex = itemsPerPage * (currentPage - 1);
  const lastItemIndex = firstItemIndex + itemsPerPage <= items.length
    ? firstItemIndex + itemsPerPage
    : items.length;

  const shownItems = items.slice(firstItemIndex, lastItemIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${firstItemIndex + 1} - ${lastItemIndex} of ${items.length})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={itemsPerPage}
            onChange={(event) => {
              setItemsPerPage(Number(event.target.value));
              setCurrentPage(1);
            }}
          >
            {itemsCountPerPage.map(itemsNumber => (
              <option
                value={itemsNumber}
                key={itemsNumber}
              >
                {itemsNumber}
              </option>
            ))}
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
        onPageChange={handlePageChange}
      />

      <ul>
        {shownItems.map(item => (
          <li
            data-cy="item"
            key={item}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};
