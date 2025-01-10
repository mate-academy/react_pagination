import React, { useState, useEffect } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useNavigate, useLocation } from 'react-router-dom';

import './App.css';
import { Pagination } from './components/Pagination';

const TOTAL = 42;
const PAGE_DEFAULT = 1;
const PER_PAGE_DEFAULT = 5;

export const App: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);

  const [page, setPage] = useState(
    parseInt(queryParams.get('page') || `${PAGE_DEFAULT}`),
  );

  const [perPage, setPerPage] = useState(
    parseInt(queryParams.get('perPage') || `${PER_PAGE_DEFAULT}`),
  );

  useEffect(() => {
    navigate(`?page=${page}&perPage=${perPage}`, { replace: true });
  }, [page, perPage, navigate]);

  const changeItemsCount = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPage(PAGE_DEFAULT);
    setPerPage(+event.currentTarget.value);
  };

  const start = 1 + (page - 1) * perPage;
  const end = page * perPage;

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        Page {page} (items {start} - {end < TOTAL ? end : TOTAL} of {TOTAL})
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={perPage}
            onChange={changeItemsCount}
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
        currentPage={page}
        onPageChange={setPage}
      />
    </div>
  );
};

export default App;
