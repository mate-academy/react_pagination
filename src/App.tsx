import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

const items = getNumbers(1, 42)
  .map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [visibleItems, setVisibleItems]
    = useState(() => items.slice(0, itemsPerPage));

  const totalItemsCount = items.length;

  const itemsFrom = itemsPerPage * currentPage - (itemsPerPage - 1);

  const itemsTo = Math.min(itemsPerPage * currentPage, totalItemsCount);

  const handleItemsPerPageChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const itemsCount = +event.target.value;

    setItemsPerPage(itemsCount);
    setVisibleItems(items.slice(0, itemsCount));
    setCurrentPage(1);
  };

  const handleOnPageChange = (page: number) => {
    setCurrentPage(page);
    const endIndex = itemsPerPage * page;
    const startIndex = endIndex - (itemsPerPage - 1);

    setVisibleItems(items.slice(startIndex - 1, endIndex));
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} `}
        {`(items ${itemsFrom} - ${itemsTo} of ${totalItemsCount})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={itemsPerPage}
            onChange={handleItemsPerPageChange}
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
        total={totalItemsCount}
        perPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={handleOnPageChange}
      />

      <ul>
        {visibleItems.map(item => (
          <li key={item} data-cy="item">{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
