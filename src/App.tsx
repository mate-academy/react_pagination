import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42)
  .map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [page, setPage] = useState(1);

  const pagination = () => {
    const pag = [];

    for (let i = 1; i <= Math.ceil(items.length / itemsPerPage); i += 1) {
      pag.push(i);
    }

    return pag;
  };

  const paginationList = pagination();

  const tile = () => {
    const firstItemOnPage = ((itemsPerPage * page) - itemsPerPage) + 1;
    const lastItemOnPage = ((itemsPerPage * page) < 42) ? (
      itemsPerPage * page
    ) : 42;

    return `Page ${page} (items ${firstItemOnPage} - ${lastItemOnPage} of 42)`;
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {tile()}
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
        paginationList={paginationList}
        page={page}
        setPage={setPage}
      />
      <ul>
        {items.slice(
          (itemsPerPage * page) - itemsPerPage, (itemsPerPage * page),
        ).map((item) => {
          return (
            <li key={item} data-cy="item">{item}</li>
          );
        })}
      </ul>
    </div>
  );
};

export default App;
