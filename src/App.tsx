/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';
import { useSearchParams } from 'react-router-dom';

const TOTAL_PAGES = 42;

export const App: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const perPage = Number(searchParams.get('perPage')) || 5;
  const currentPage = Number(searchParams.get('page')) || 1;

  const fromItem = (currentPage - 1) * perPage + 1;
  const toItem = Math.min(currentPage * perPage, TOTAL_PAGES);
  const items = getNumbers(fromItem, toItem).map(n => `Item ${n}`);

  const handlePerChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;

    setSearchParams({ perPage: value, page: '1' });
  };

  const handlePageChange = (page: number) => {
    setSearchParams({ perPage: String(perPage), page: String(page) });
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        Page {currentPage} (items {fromItem} - {toItem} of {TOTAL_PAGES})
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={perPage}
            onChange={handlePerChange}
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
        total={TOTAL_PAGES}
        perPage={perPage}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />

      <ul>
        {items.map((item, index) => (
          <li key={index} data-cy="item">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};
