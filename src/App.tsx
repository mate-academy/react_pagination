import React from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';
import { useSearchParams } from 'react-router-dom';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42).map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams({
    perPage: '5',
    page: '1',
  });

  const page = searchParams.get('page') || '1';
  const perPage = searchParams.get('perPage') || '5';
  const currentPage = Number(page);

  const startIndex = (currentPage - 1) * Number(perPage);
  const endIndex = Math.min(Number(perPage) + startIndex, items.length);

  const updateParams = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams);

    params.set(key, value);
    setSearchParams(params);
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        Page {page} (items {startIndex + 1} - {endIndex} of {items.length})
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          {/* важливо! оновленя двох параметрів  */}
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={perPage}
            onChange={e => {
              const params = new URLSearchParams();

              params.set('perPage', e.target.value);
              params.set('page', '1');

              setSearchParams(params);
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

      <Pagination
        total={items.length}
        perPage={Number(perPage)}
        onPageChange={newPage => {
          updateParams('page', String(newPage));
        }}
        currentPage={currentPage}
      />

      <ul>
        {items.slice(startIndex, endIndex).map(item => {
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
