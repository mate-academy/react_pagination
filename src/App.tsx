import React, { useState } from 'react';
import './App.css';
import { Pagination } from './components/Pagination';
import { getNumbers, calculateItems } from './utils';

function handlePageChange(
  page: number,
  setCurrentPage: (page: number) => void,
) {
  setCurrentPage(page);
}

function handlePerPageChange(
  e: React.ChangeEvent<HTMLSelectElement>,
  setPerPage: (perPage: number) => void,
  setCurrentPage: (page: number) => void,
) {
  const newPerPage = parseInt(e.target.value, 10);

  setPerPage(newPerPage);
  setCurrentPage(1);
}

export const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const totalItems = 42; // Total number of items

  const [startItem, endItem] = calculateItems(currentPage, perPage, totalItems);
  const items = getNumbers(endItem - startItem + 1, startItem - 1).map(
    n => `Item ${n}`,
  );

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        Page {currentPage} (items {startItem} - {endItem} of {totalItems})
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={perPage}
            onChange={e => handlePerPageChange(e, setPerPage, setCurrentPage)}
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
        perPage={perPage}
        currentPage={currentPage}
        onPageChange={page => handlePageChange(page, setCurrentPage)}
      />

      <ul>
        {items.map(item => (
          <li key={item} data-cy="item">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
