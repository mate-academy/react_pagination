import React, { useState } from 'react';
import './App.css';
import { Pagination } from './components/Pagination';
import { getNumbers } from './utils';

const getPageItems = (
  total: number,
  itemsPerPage: number,
  currentPage: number,
) => {
  return [...getNumbers(1, total)].slice(
    itemsPerPage * (currentPage - 1),
    itemsPerPage * currentPage,
  );
};

const ITEMS_COUNT = 42;

export const App: React.FC = () => {
  const [perPage, setPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  const pageItems = getPageItems(ITEMS_COUNT, perPage, currentPage);

  const handlePerPageSelectorChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setPerPage(+event.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        Page {currentPage} (items {pageItems[0]} -{' '}
        {pageItems[pageItems.length - 1]} of {ITEMS_COUNT})
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            onChange={handlePerPageSelectorChange}
            defaultValue={5}
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
        total={ITEMS_COUNT} // total number of items to paginate
        perPage={perPage} // number of items per page
        currentPage={currentPage} /* optional with 1 by default */
        onPageChange={handlePageChange}
      />

      <ul>
        {/* {getNumbers(1, ITEMS_COUNT).map((n, index) => (
          <li data-cy="item" key={index}>
            Item {n}
          </li>
        ))} */}
        {pageItems.map((n, index) => (
          <li data-cy="item" key={index}>
            Item {n}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
