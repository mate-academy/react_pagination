import cn from 'classnames';
import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';

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
      <ul className="pagination">
        <li className={cn('page-item', {
          disabled: page === 1,
        })}
        >
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled={page === 1}
            onClick={() => {
              setPage(currentPage => currentPage - 1);
            }}
          >
            «
          </a>
        </li>
        {pagination().map((number) => {
          return (
            <li
              className={cn('page-item', {
                active: page === number,
              })}
              key={number}
            >
              <a
                data-cy="pageLink"
                className="page-link"
                href="#1"
                onClick={() => {
                  setPage(number);
                }}
              >
                {number}
              </a>
            </li>
          );
        })}
        <li className={cn('page-item', {
          disabled: (page === pagination().length),
        })}
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={page === pagination().length}
            onClick={() => {
              setPage(currentPage => currentPage + 1);
            }}
          >
            »
          </a>
        </li>
      </ul>
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
