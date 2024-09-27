import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

type Intial<OptionsList extends number[]> = {
  total: number;
  perPageOptions: OptionsList;
  perPageInitial: OptionsList[number];
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars

const initialData: Intial<[3, 5, 10, 20]> = {
  total: 42,
  perPageOptions: [3, 5, 10, 20],
  perPageInitial: 5,
};

const items = getNumbers(1, initialData.total).map((n, i) => ({
  id: i,
  item: `Item ${n}`,
}));

export const App: React.FC = () => {
  const [perPage, setPerPage] = useState(initialData.perPageInitial);
  const [activePage, setActivePage] = useState(1);

  const firstItemOnPage = perPage * activePage - perPage + 1;
  const lastItemOnPage =
    perPage * activePage > initialData.total
      ? initialData.total
      : perPage * activePage;

  const getCurrentItems = (): string =>
    `${firstItemOnPage} - ${lastItemOnPage}`;

  const itemsToDispaly = items.filter((_item, i) => {
    return i + 1 >= firstItemOnPage && i + 1 <= lastItemOnPage;
  });

  function handleSelectEvent(event: React.ChangeEvent<HTMLSelectElement>) {
    setActivePage(1);
    setPerPage(
      Number(event.target.value) as (typeof initialData.perPageOptions)[number],
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
            {[...initialData.perPageOptions].map(opt => {
              return (
                <option key={opt} value={opt}>
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
        total={initialData.total}
        perPage={perPage}
        currentPage={activePage}
        onPageChange={page => {
          setActivePage(page);
        }}
      />
      <ul>
        {itemsToDispaly.map(({ id, item }) => {
          return (
            <li key={id} data-cy="item">
              {item}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default App;
