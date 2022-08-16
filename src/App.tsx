import React, { ChangeEvent, useState } from 'react';
import './App.css';
import { Pagination } from './components/Pagination';
import { getNumbers } from './utils';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const totalItems = 42;
const itemsPerPageDefault = 5;
const items = getNumbers(1, totalItems)
  .map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(itemsPerPageDefault);

  const startItem = (currentPage - 1) * itemsPerPage;
  const endItem = currentPage * itemsPerPage < totalItems
    ? currentPage * itemsPerPage
    : totalItems;

  const visibleItems = items.slice(startItem, endItem);

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setCurrentPage(1);
    setItemsPerPage(+event.target.value);
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${startItem + 1} - ${endItem} of ${totalItems})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={itemsPerPage}
            onChange={handleChange}
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
        total={totalItems}
        perPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
      <ul>
        {visibleItems.map(visibleItem => (
          <li key={visibleItem} data-cy="item">
            {visibleItem}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
