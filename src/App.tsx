import React, { useState } from 'react';
import './App.css';

import { Pagination } from './components/Pagination';

const INITIAL_PER_PAGE = 5;
const INITIAL_PAGE = 1;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const App: React.FC = () => {
  const [perPage, setPerPage] = useState(INITIAL_PER_PAGE);
  const [currentPage, setCurrentPage] = useState(INITIAL_PAGE);
  const total = 42;
  const elemStart = perPage * (currentPage - 1) + 1;
  let elemEnd = elemStart + perPage - 1;

  if (elemEnd > total) {
    elemEnd = total;
  }

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${elemStart} - ${elemEnd} of ${total})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            onChange={event => {
              setCurrentPage(1);
              setPerPage(+event.target.value);
            }}
            defaultValue="5"
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
        total={total}
        perPage={perPage}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />

    </div>
  );
};

export default App;
