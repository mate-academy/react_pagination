import React from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './Pagination';
import { useSearchParams } from 'react-router-dom';

const items = getNumbers(1, 42).map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const page = Number(searchParams.get('page')) || 1;
  const perPage = Number(searchParams.get('perPage')) || 5;

  const total = items.length;
  const start = (page - 1) * perPage;
  const visibleItems = items.slice(start, start + perPage);

  const handlePageChange = (newPage: number) => {
    if (newPage !== page) {
      setSearchParams({
        page: String(newPage),
        perPage: String(perPage),
      });
    }
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        Page {page} (items {start + 1} - {start + visibleItems.length} of{' '}
        {total})
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={perPage}
            onChange={e =>
              setSearchParams({
                page: '1',
                perPage: e.target.value,
              })
            }
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
        currentPage={page}
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
