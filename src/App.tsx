import React, { useCallback, useMemo } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';
import { useSearchParams } from 'react-router-dom';

export type Params = {
  [key: string]: number;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42).map(n => `Item ${n}`);
const options = [3, 5, 10, 20];

export const App: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const perPage = +(searchParams.get('perPage') || options[1]);
  const currentPage = +(searchParams.get('page') || 1);

  const firstItemIndex = useMemo(
    () => (currentPage - 1) * perPage,
    [currentPage, perPage],
  );

  const lastItemIndex = useMemo(
    () => firstItemIndex + perPage,
    [firstItemIndex, perPage],
  );

  const visibleItems = useMemo(
    () => items.slice(firstItemIndex, lastItemIndex),
    [items, firstItemIndex, lastItemIndex],
  );

  const setSearchWith = useCallback(
    (params: Params) => {
      const newParams = new URLSearchParams(searchParams);

      Object.entries(params).forEach(([key, value]) =>
        newParams.set(key, value.toString()),
      );

      setSearchParams(newParams);
    },
    [searchParams, setSearchParams],
  );

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${firstItemIndex + 1} - ${Math.min(lastItemIndex, items.length)} of ${items.length})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={perPage}
            onChange={event => {
              setSearchWith({ page: 1, perPage: +event.target.value });
            }}
          >
            {options.map(option => (
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

      {/* Move this markup to Pagination */}
      <Pagination
        total={items.length}
        perPage={perPage}
        currentPage={currentPage}
        onPageChange={setSearchWith}
      />

      <ul>
        {visibleItems.map(item => (
          <li data-cy="item" key={item}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
