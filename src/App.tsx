import React, { useState } from 'react';
import './App.css';
import { getNumbers, getMaxPageNumber } from './utils';
import { Pagination } from './components/Pagination';

const PAGE_INITIAL = 1;
const ITEMS_PER_PAGE_INITIAL = 5;
const PER_PAGE_SELECTOR_OPTIONS = [3, 5, 10, 20];

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42)
  .map(n => `Item ${n}`);

export const App: React.FC = () => {
  const itemsList = [...items]; // get all items from server

  const itemsQty = itemsList.length;

  const [page, setPage] = useState<number>(PAGE_INITIAL);

  const [itemsPerPage, setItemsPerPage]
    = useState<number>(ITEMS_PER_PAGE_INITIAL);

  const maxPageNumber = getMaxPageNumber(itemsQty, itemsPerPage);

  const firstItemInPage = Math.min(
    page * itemsPerPage - itemsPerPage,
    (maxPageNumber - 1) * itemsPerPage,
  );
  const lastItemInPage = Math.min(page * itemsPerPage, itemsQty);

  const itemsToRender = [...itemsList].slice(
    firstItemInPage,
    lastItemInPage,
  );

  const handerItemsPerPage = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setItemsPerPage(+event.target.value);
    setPage(PAGE_INITIAL);
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${page} (items ${firstItemInPage + 1} - ${lastItemInPage} of ${itemsQty})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            defaultValue={ITEMS_PER_PAGE_INITIAL}
            onChange={e => handerItemsPerPage(e)}
          >
            {PER_PAGE_SELECTOR_OPTIONS.map(option => (
              <option
                key={option}
                value={option}
              >
                {option}
              </option>
            ))}
          </select>
        </div>

        <label htmlFor="perPageSelector" className="col-form-label col">
          items per page
        </label>
      </div>

      <Pagination
        total={itemsQty}
        perPage={itemsPerPage}
        currentPage={page}
        onPageChange={setPage}
      />
      <ul>
        {itemsToRender.map(item => (
          <li
            key={item}
            data-cy="item"
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
