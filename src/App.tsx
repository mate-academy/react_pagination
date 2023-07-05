import React, { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';
import { getPeriod } from './helpers/getPeriod';

const items = getNumbers(1, 42)
  .map(n => `Item ${n}`);

type PaginationParams = {
  cursor: number;
  periodOfPage: number;
};

export const App: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const cursorFromQuery = searchParams.get('cursor') || 1;
  const periodOfPageFromQuery = searchParams.get('periodOfPage') || 5;

  const [
    { cursor, periodOfPage },
    setPaginationParams,
  ] = useState<PaginationParams>({
    cursor: +cursorFromQuery,
    periodOfPage: +periodOfPageFromQuery,
  });

  const countOfAllItems = useMemo(() => items.length, []);
  const [from, to] = getPeriod(
    cursor,
    periodOfPage,
    countOfAllItems,
  );

  const infoText = `Page ${cursor} (items ${from} - ${to} of ${countOfAllItems})`;

  const selectHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPaginationParams({
      cursor: 1,
      periodOfPage: +event.currentTarget.value,
    });

    setSearchParams({
      cursor: '1',
      periodOfPage: event.currentTarget.value,
    });
  };

  const onPageChange = (page: number) => {
    setPaginationParams({
      periodOfPage,
      cursor: page,
    });

    setSearchParams({
      periodOfPage: String(periodOfPage),
      cursor: String(page),
    });
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {infoText}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={periodOfPage}
            onChange={selectHandler}
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
        total={countOfAllItems}
        perPage={periodOfPage}
        currentPage={cursor}
        onPageChange={onPageChange}
      />
    </div>
  );
};
