import React, { useState } from 'react';
import './App.css';
import { Pagination } from './components/Pagination';
import { getNumbers } from './utils';

const TOTAL_ITEMS = 42;
const ELEMENTS_PER_PAGE = 5;
const START_PAGE = 1;

const items = getNumbers(1, TOTAL_ITEMS).map(n => `Item ${n}`);

export const App: React.FC = () => {
  const totalItemsCount = TOTAL_ITEMS;
  const [perPage, setPerPage] = useState(ELEMENTS_PER_PAGE);
  const [currentPage, setCurrentPage] = useState(START_PAGE);

  const itemsAfterChange = items.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage,
  );

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        Page {currentPage} (items {(currentPage - 1) * perPage + 1} -{' '}
        {Math.min(totalItemsCount, perPage * currentPage)} of {items.length})
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            onChange={e => {
              setPerPage(+e.target.value);
              setCurrentPage(1);
            }}
            value={perPage}
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
        perPage={perPage}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
      <ul>
        {itemsAfterChange.map(item => (
          <li key={item} data-cy="item">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
