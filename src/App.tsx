import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const totalItems = 42;
const items = getNumbers(1, totalItems).map(n => `Item ${n}`);

enum NumberPerPageItems {
  THREE = 3,
  FIVE = 5,
  TEN = 10,
  TWENTY = 20,
}

export const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(NumberPerPageItems.FIVE);

  const startItem = currentPage * perPage - (perPage - 1);
  const endItem = currentPage * perPage;

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        Page {currentPage} (items {startItem} -{' '}
        {endItem > totalItems ? totalItems : endItem} of {totalItems})
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            onChange={e => {
              setPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
            value={perPage}
          >
            <option>{NumberPerPageItems.THREE}</option>
            <option>{NumberPerPageItems.FIVE}</option>
            <option>{NumberPerPageItems.TEN}</option>
            <option>{NumberPerPageItems.TWENTY}</option>
          </select>
        </div>

        <label htmlFor="perPageSelector" className="col-form-label col">
          items per page
        </label>
      </div>

      <Pagination
        total={totalItems} // total number of items to paginate
        perPage={perPage} // number of items per page
        currentPage={currentPage} /* optional with 1 by default */
        onPageChange={page => {
          if (currentPage !== page) {
            setCurrentPage(page);
          }
        }}
      />
      <ul>
        {items.slice(startItem - 1, endItem).map(i => (
          <li key={i} data-cy="item">
            {i}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
