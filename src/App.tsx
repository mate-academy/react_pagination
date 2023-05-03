import React, { useState } from 'react';
import './App.css';
import { Pagination } from './components/Pagination';
import { getNumbers } from './utils';

export const App: React.FC = () => {
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [total] = useState(42);

  const totalPageSelectors = Math.ceil(total / itemsPerPage);

  const handleItemsPerPage = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setItemsPerPage(parseInt(event.currentTarget.value, 10));
  };

  const onChangePage = (pageSelector: number) => {
    setCurrentPage(pageSelector);
  };

  const items = getNumbers(1, total).map(n => `Item ${n}`);

  const firstItemIndex = currentPage * itemsPerPage - itemsPerPage;
  const lastItemIndex = currentPage * itemsPerPage <= total
    ? currentPage * itemsPerPage
    : total;

  const currentItems = items.slice(firstItemIndex, lastItemIndex);

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        Page 1 (items 1 - 5 of 42)
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={itemsPerPage}
            onChange={handleItemsPerPage}
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

      <ul>
        {currentItems.map((item) => (
          <li
            data-cy="item"
            key={item}
          >
            {item}
          </li>
        ))}
      </ul>

      <Pagination
        totalPages={totalPageSelectors}
        onChangePage={onChangePage}
        currentPage={currentPage}
      />
    </div>
  );
};

export default App;
