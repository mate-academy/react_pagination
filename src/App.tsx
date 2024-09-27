import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

type Intial<T extends number[]> = {
  total: number;
  perPageOptions: T;
  perPageInitial: T[number];
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars

const intialData: Intial<[3, 5, 10, 20]> = {
  total: 42,
  perPageOptions: [3, 5, 10, 20],
  perPageInitial: 5,
};

const items = getNumbers(1, intialData.total).map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [perPage, setPerPage] = useState(intialData.perPageInitial);
  const [activePage, setActivePage] = useState(1);

  const firstItemOnPage = perPage * activePage - perPage + 1;
  const lastItemOnPage =
    perPage * activePage > intialData.total
      ? intialData.total
      : perPage * activePage;

  const getCurrentItems = (): string =>
    `${firstItemOnPage} - ${lastItemOnPage}`;

  function handleSelectEvent(event: React.ChangeEvent<HTMLSelectElement>) {
    setActivePage(1);
    setPerPage(
      Number(event.target.value) as (typeof intialData.perPageOptions)[number],
    );
  }

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${activePage} (items ${getCurrentItems()} of ${items.length})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            onChange={handleSelectEvent}
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={perPage}
          >
            {[...intialData.perPageOptions].map(opt => {
              const key = Math.random().toFixed(5).slice(2);

              return (
                <option key={key} value={opt}>
                  {opt}
                </option>
              );
            })}
          </select>
        </div>

        <label htmlFor="perPageSelector" className="col-form-label col">
          items per page
        </label>
      </div>

      <Pagination
        total={intialData.total}
        perPage={perPage}
        currentPage={activePage}
        onPageChange={page => {
          setActivePage(page);
        }}
      />
      <ul>
        {items.map((item, index) => {
          const key = Math.random().toFixed(5).slice(2);

          return (
            index + 1 >= firstItemOnPage &&
            index + 1 <= lastItemOnPage && (
              <li key={key} data-cy="item">
                {item}
              </li>
            )
          );
        })}
      </ul>
    </div>
  );
};

export default App;
