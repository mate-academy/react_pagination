import React, { useState } from 'react';
import './App.css';
import { Pagination } from './components/Pagination';

const PAGES_NUM = 42;

export const App: React.FC = () => {
  const [perPage, setPerPage] = useState(5);
  const [page, setPage] = useState(1);

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        Page {page} (items {(page - 1) * perPage + 1} -{' '}
        {page * perPage < PAGES_NUM ? page * perPage : PAGES_NUM} of {PAGES_NUM}
        )
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={perPage}
            onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
              setPerPage(+event.target.value);
              setPage(1);
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
        total={PAGES_NUM}
        perPage={perPage}
        currentPage={page}
        onPageChange={setPage}
      />
    </div>
  );
};

export default App;
