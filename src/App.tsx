import React, { useState } from 'react';
import './App.css';
import { Pagination } from './components/Pagination';
import { getCurrentItems, getNumbers } from './utils';

/* eslint-disable */

const items = getNumbers(1, 42)
  .map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [itemPerPage, setItemPerPage] = useState(3);
  const [currentPage, setCurrentPage] = useState(1);

  const currentItems = getCurrentItems(items, itemPerPage, currentPage);

  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  const startIndex = itemPerPage * (currentPage - 1);
  const endIndex = itemPerPage * currentPage;


  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        Page {currentPage} (items {startIndex + 1} - {endIndex} of 42)
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={itemPerPage}
            onChange={event => setItemPerPage(Number(event.target.value))}
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
        total={42} // total number of items to paginate
        perPage={itemPerPage} // number of items per page
        currentPage={currentPage} /* optional with 1 by default */
        onPageChange={onPageChange}
      />

      <ul>
        {currentItems.map(currentItem => (
          <li key={currentItem} data-cy="item">
            {currentItem}
          </li>
        ))}

      </ul>

    </div>
  );
};

export default App;
