import { useSearchParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42).map(n => `Item ${n}`);
const ALLOWED_PER_PAGE = [3, 5, 10, 20];

export const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(5);

  const [searchParams, setSearchParams] = useSearchParams();

  // Mount-only by design: applies URL params to state once on load.
  // Browser back/forward navigation after mount is not supported.
  useEffect(() => {
    const page = searchParams.get('page');
    const perPageParam = searchParams.get('perPage');

    const parsedPerPage = Number(perPageParam);
    const validPerPage = ALLOWED_PER_PAGE.includes(parsedPerPage)
      ? parsedPerPage
      : 5;
    const totalPages = Math.ceil(items.length / validPerPage);
    const parsedPage = Number(page);
    const validPage = !Number.isNaN(parsedPage)
      ? Math.min(Math.max(1, parsedPage), totalPages)
      : 1;

    setPerPage(validPerPage);
    setCurrentPage(validPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // Intentionally overwrites all query params: the app doesn't
    // use any params other than page/perPage.
    setSearchParams({ page: String(currentPage), perPage: String(perPage) });
  }, [currentPage, perPage, setSearchParams]);

  const startItem = (currentPage - 1) * perPage + 1;
  const endItem = Math.min(currentPage * perPage, items.length);

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        Page {currentPage} (items {startItem} - {endItem} of {items.length})
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={perPage}
            onChange={e => {
              setPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
          >
            {ALLOWED_PER_PAGE.map(value => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        </div>

        <label htmlFor="perPageSelector" className="col-form-label col">
          items per page
        </label>
      </div>

      <Pagination
        total={items.length}
        perPage={perPage}
        currentPage={currentPage}
        onPageChange={page => setCurrentPage(page)}
      />

      <ul>
        {items
          .slice((currentPage - 1) * perPage, currentPage * perPage)
          .map((item, index) => (
            <li key={index} data-cy="item">
              {item}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default App;
