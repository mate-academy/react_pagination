import './App.css';
import React, { useEffect } from 'react';
import { getNumbers } from './utils';
import { useSearchParams } from 'react-router-dom';
import { Pagination } from './components/Pagination';
import { useState } from 'react';

const items = getNumbers(1, 42).map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const pageFromUrl = Number(searchParams.get('page')) || 1;
  const perPageFromUrl = Number(searchParams.get('perPage')) || 5;
  const [perPage, setPerPage] = useState(perPageFromUrl);
  const [currentPage, setCurrentPage] = useState(pageFromUrl);

  useEffect(() => {
    setSearchParams({ page: String(currentPage), perPage: String(perPage) });
  }, [currentPage, perPage, setSearchParams]);

  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  const start = (currentPage - 1) * perPage;
  const end = Math.min(start + (perPage - 1), items.length - 1);

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        Page {currentPage} (items {start + 1} - {end + 1} of {items.length})
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={perPage}
            onChange={event => {
              setPerPage(Number(event.target.value));
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

      {/* Move this markup to Pagination */}
      <Pagination
        total={items.length}
        perPage={perPage}
        currentPage={currentPage}
        onPageChange={onPageChange}
      />
      <ul>
        {items.slice(start, end + 1).map(item => (
          <li data-cy="item" key={item}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
