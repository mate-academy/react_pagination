import React, { useState } from 'react';

import './App.css';
import { getNumbers, prepareItems } from './utils';
import { DEFAULT_PERPAGE, TOTAL } from './constants';
import { Pagination } from './components/Pagination';

export const App: React.FC = () => {
  const [perPage, setPerPage] = useState(DEFAULT_PERPAGE);
  const [currentPage, setCurrentPage] = useState(1);
  const items = prepareItems(getNumbers(1, TOTAL), perPage, currentPage);

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        Page {currentPage} (items {items[0]} - {items[items.length - 1]} of{' '}
        {TOTAL})
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={perPage}
            onChange={event => {
              setPerPage(parseInt(event.target.value));
              setCurrentPage(1);
            }}
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
        total={TOTAL}
        perPage={perPage}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
      <ul>
        {items.map(item => {
          return (
            <li key={item} data-cy="item">
              {`Item ${item}`}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default App;
