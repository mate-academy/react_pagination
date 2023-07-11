import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';
import { PageInfo } from './types/PageInfo';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, PageInfo.Total)
  .map(n => (
    `Item ${n}`
  ));

function getIndexes(
  array: string[],
  start: number,
  end: number,
): string[] {
  return array.slice(start, end);
}

export const App: React.FC = () => {
  const [page, setPage] = useState(1);
  const [itemPerPage, setItemPerPage] = useState(5);
  const start = (page - 1) * itemPerPage;
  const end = (page - 1) * itemPerPage + itemPerPage;

  const preparedItems = getIndexes(items, start, end);

  const startTitle = start + 1;
  const endTitle = end >= PageInfo.Total ? PageInfo.Total : end;

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${page} (items ${startTitle} - ${endTitle} of 42)`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
              setPage(1);
              setItemPerPage(+event.target.value);
            }}
          >
            <option value="3">3</option>
            <option value="5" selected>5</option>
            <option value="10">10</option>
            <option value="20">20</option>
          </select>
        </div>

        <label htmlFor="perPageSelector" className="col-form-label col">
          items per page
        </label>
      </div>

      <Pagination
        total={PageInfo.Total}
        perPage={itemPerPage}
        currentPage={page}
        onPageChange={(newPage: number) => setPage(newPage)}
      />
      <ul>
        {preparedItems.map(item => (
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
