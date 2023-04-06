import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './App.css';
import { Pagination } from './components/Pagination/Pagination';
import { items, itemsPerPageConstant, totalItems } from './constants';

export const App: React.FC = () => {
  const [itemsPerPage, setPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  const visibleItemsCount = itemsPerPage * currentPage - itemsPerPage + 1;

  const visibleItems = items
    .slice(visibleItemsCount - 1, itemsPerPage * currentPage);

  const lastVisibleItem = visibleItemsCount + visibleItems.length - 1;

  const handleSetPerPage = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPerPage(Number(event.target.value));
    setCurrentPage(1);
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${visibleItemsCount} - ${lastVisibleItem} of ${totalItems})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={itemsPerPage}
            onChange={handleSetPerPage}
          >
            {itemsPerPageConstant.map(item => (
              <option
                value={item}
                key={item}
              >
                {item}
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
        perPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />

      <ul>
        {visibleItems.map(item => (
          <li
            data-cy="item"
            key={uuidv4()}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
