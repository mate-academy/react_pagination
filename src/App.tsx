import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42).map((n) => `Item ${n}`);

const getPaginationList = (item: string[], itemsPerPage: number): number[] => {
  const pagin = [];

  for (let i = 1; i <= Math.ceil(item.length / itemsPerPage); i += 1) {
    pagin.push(i);
  }

  return pagin;
};

const tileCount = (page: number, itemsPerPage: number) => {
  const firstItemOnPage = itemsPerPage * page - itemsPerPage + 1;
  const lastItemOnPage = itemsPerPage * page < 42 ? itemsPerPage * page : 42;

  return `Page ${page} (items ${firstItemOnPage} - ${lastItemOnPage} of 42)`;
};

export const App: React.FC = () => {
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const paginationList = getPaginationList(items, itemsPerPage);

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {tileCount(page, itemsPerPage)}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={itemsPerPage}
            onChange={(event) => {
              setItemsPerPage(+event.target.value);
              setPage(1);
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

      {/* Move this markup to Pagination */}
      <Pagination
        page={page}
        setPage={setPage}
        paginationList={paginationList}
      />

      <ul>
        {items
          .slice(itemsPerPage * page - itemsPerPage, itemsPerPage * page)
          .map((item) => {
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
