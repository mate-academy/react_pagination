import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useSearchParams } from 'react-router';
import './App.css';
import { Pagination } from './components/Pagination';
import { getNumbers } from './utils';

enum PerPage {
  THREE = 3,
  FIVE = 5,
  TEN = 10,
  TWENTY = 20,
}

const items: string[] = getNumbers(1, 42).map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get('page')) || 1;
  const perPage = Number(searchParams.get('perPage')) || PerPage.FIVE;

  const startIndex = (page - 1) * perPage;
  const endIndex = Math.min(startIndex + perPage, items.length);
  const visibleItems = items.slice(startIndex, endIndex);

  const handlePageChange = (newPage: number) => {
    searchParams.set('page', newPage.toString());
    setSearchParams(searchParams);
  };

  const handlePerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    searchParams.set('perPage', e.target.value);
    searchParams.set('page', '1');
    setSearchParams(searchParams);
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        Page {page} (items {startIndex + 1} - {endIndex} of {items.length})
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
            <option value={PerPage.THREE}>{PerPage.THREE}</option>
            <option value={PerPage.FIVE}>{PerPage.FIVE}</option>
            <option value={PerPage.TEN}>{PerPage.TEN}</option>
            <option value={PerPage.TWENTY}>{PerPage.TWENTY}</option>
          </select>
        </div>

        <label htmlFor="perPageSelector" className="col-form-label col">
          items per page
        </label>
      </div>

      <Pagination
        total={items.length}
        perPage={perPage}
        currentPage={page}
        onPageChange={handlePageChange}
      />
      <ul>
        {visibleItems.map(item => {
          return (
            <li key={item} data-cy="item">
              {item}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default App;
