import React, { useEffect, useState } from 'react';
import './App.css';
import { Pagination } from './components/Pagination';
import { getNumbers } from './utils';
import { List } from './components/List/List';
import { useNavigate } from 'react-router-dom';

const items = getNumbers(1, 42).map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [page, setPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(5);
  const pages = [3, 5, 10, 20];
  const navigate = useNavigate();

  const leftLimitOnPage = (page - 1) * perPage + 1;
  const rightLimitOnPage = (page - 1) * perPage + perPage;

  useEffect(() => {
    navigate(`?page=${1}&perPage=${perPage}`);
  }, [navigate, perPage]);

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        Page {page} (items {leftLimitOnPage} -{' '}
        {rightLimitOnPage < items.length ? rightLimitOnPage : items.length}
        of {items.length})
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={perPage}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
              setPerPage(parseInt(e.target.value));
              setPage(1);
              navigate(`?page=1&perPage=${e.target.value}`);
            }}
          >
            {pages.map(pageNumber => (
              <option value={pageNumber} key={`page: ${pageNumber}`}>
                {pageNumber}
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
        currentPage={page}
        perPage={perPage}
        total={items.length}
        onPageChange={setPage}
      />

      <List items={items} />
    </div>
  );
};

export default App;
