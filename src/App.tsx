import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

const items = getNumbers(1, 42).map(num => `Item ${num}`);
const PER_PAGE_OPTIONS = [3, 5, 10, 20] as const;

const clamp = (n: number, min: number, max: number) =>
  Math.min(max, Math.max(min, n));

export const App: React.FC = () => {
  const total = items.length;
  const [searchParams, setSearchParams] = useSearchParams();

  const perPageFromUrl = Number(searchParams.get('perPage')) || 5;
  const initialPerPage = PER_PAGE_OPTIONS.includes(
    perPageFromUrl as (typeof PER_PAGE_OPTIONS)[number],
  )
    ? perPageFromUrl
    : 5;

  const [perPage, setPerPage] = useState<number>(initialPerPage);
  const totalPages = Math.max(1, Math.ceil(total / perPage));

  const pageFromUrl = Number(searchParams.get('page')) || 1;
  const [currentPage, setCurrentPage] = useState<number>(
    clamp(pageFromUrl, 1, totalPages),
  );

  useEffect(() => {
    const next = new URLSearchParams(searchParams);
    next.set('page', String(currentPage));
    next.set('perPage', String(perPage));
    setSearchParams(next, { replace: true });
  }, [currentPage, perPage, searchParams, setSearchParams]);

  const startIndex = (currentPage - 1) * perPage;
  const endIndex = Math.min(startIndex + perPage, total);
  const visibleItems = items.slice(startIndex, endIndex);

  const handlePerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const nextPerPage = Number(e.target.value);

    if (nextPerPage !== perPage) {
      setPerPage(nextPerPage);
      setCurrentPage(1);
    }
  };

  const handlePageChange = (page: number) => {
    if (page !== currentPage) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${total === 0 ? 0 : startIndex + 1} - ${endIndex} of ${total})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={perPage}
            onChange={handlePerPageChange}
          >
            {PER_PAGE_OPTIONS.map(option => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
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
        onPageChange={handlePageChange}
      />

      <ul>
        {visibleItems.map(item => (
          <li key={item} data-cy="item">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
