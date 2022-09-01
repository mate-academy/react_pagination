import React, { useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Pagination } from './components/Pagination';
import { getNumbers } from './utils';
import './App.css';

const items = getNumbers(1, 42)
  .map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get('page')) || 1;
  const perPage = Number(searchParams.get('perPage')) || 5;
  const totalPages: number = items.length;

  const handlePerPageChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      setSearchParams({ page: '1', perPage: event.target.value || '3' });
    }, [],
  );

  const firstItem = (+page - 1) * perPage;
  const lastItem = (firstItem + perPage) > totalPages
    ? totalPages
    : firstItem + perPage;
  const currentPageItems = items.slice(firstItem, lastItem);

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${page} (items ${firstItem + 1} - ${lastItem} of ${totalPages})`}
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
        totalPages={totalPages}
        currentPage={+page}
        perPage={perPage}
        onPageChange={setSearchParams}
      />

      <ul>
        {currentPageItems.map(item => (
          <li
            data-cy="item"
            key={item}
          >
            {item}
          </li>

        ))}
      </ul>
    </div>
  );
};
