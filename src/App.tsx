import React, { useEffect, useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';
import { useSearchParams } from 'react-router-dom';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42).map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [perPage, setPerPage] = useState(
    () => +(searchParams.get('perPage') ?? 5),
  );
  const [page, setCurrentPage] = useState(
    () => +(searchParams.get('page') ?? 1),
  );

  const end = page * perPage;
  const start = end - perPage;

  const handlePerPage = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPerPage(+e.target.value);
    setCurrentPage(1);
  };

  useEffect(() => {
    const params = new URLSearchParams();

    params.set('page', page.toString());
    params.set('perPage', perPage.toString());
    setSearchParams(params);
  }, [page, perPage]);

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        Page {page} (items {start + 1} -{' '}
        {end >= items.length ? items.length : end} of 42)
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={perPage}
            onChange={handlePerPage}
          >
            {[3, 5, 10, 20].map(e => (
              <option key={e} value={e}>
                {e}
              </option>
            ))}
          </select>
        </div>

        <label htmlFor="perPageSelector" className="col-form-label col">
          items per page
        </label>
      </div>

      {/* Move this markup to Pagination */}
      <Pagination
        perPage={perPage}
        total={items.length}
        currentPage={page}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default App;
