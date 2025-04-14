import React, { useState } from 'react';

import './App.css';

import { getNumbers } from './utils';

import { Pagination } from './components/Pagination';

import { ItemCountToShow } from './types/ItemCountToShow';

function prepareItemsForOutput(
  items: number[],
  perPage: ItemCountToShow,
  currentPage: number,
): number[] {
  const lastPageItem = currentPage * perPage;

  return items.slice(lastPageItem - perPage, lastPageItem);
}

const TOTAL_PAGES = 42;
const items = getNumbers(1, TOTAL_PAGES).map(n => n);

export const App: React.FC = () => {
  const [perPage, setPerPage] = useState(ItemCountToShow.Five);
  const [currentPage, setCurrentPage] = useState(1);

  const handleChangePerPage = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPerPage(+event.target.value);
    setCurrentPage(1);
  };

  const preparedItems = prepareItemsForOutput(items, perPage, currentPage);

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${preparedItems[0]} - ${preparedItems[preparedItems.length - 1]} of ${TOTAL_PAGES})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={perPage}
            onChange={handleChangePerPage}
          >
            {Object.values(ItemCountToShow)
              .filter(value => typeof value === 'number')
              .map(count => (
                <option key={count} value={count}>
                  {count}
                </option>
              ))}
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
        onPageChange={setCurrentPage}
      />

      <ul>
        {preparedItems.map(item => (
          <li key={item} data-cy="item">
            {`Item ${item}`}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
