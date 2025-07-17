import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42).map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [itemsPerPage, setItemsPerPage] = useState<number>(5);
  const [pageActive, setPageActive] = useState<number>(1);
  const [numberOfPages, setNumberOfPages] = useState<number>(9);
  const arrayNumberOfPage: number[] = [];
  const end = Math.min(itemsPerPage * pageActive, items.length);
  const start = itemsPerPage * (pageActive - 1) + 1;

  for (let i = 1; i <= numberOfPages; i++) {
    arrayNumberOfPage.push(Number(i));
  }

  function handlePerPageChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const newItemsPerPage = Number(event.target.value);

    setItemsPerPage(newItemsPerPage);
    setNumberOfPages(Math.ceil(42 / newItemsPerPage));
  }

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        Page {pageActive} (items {start} - {end} of 42)
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            onChange={handlePerPageChange}
            defaultValue={5}
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
        <li
          className={`page-item ${pageActive === arrayNumberOfPage[0] ? 'disabled' : ''}`}
        >
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled={pageActive === arrayNumberOfPage[0]}
            onClick={() => {
              if (pageActive > arrayNumberOfPage[0]) {
                setPageActive(pageActive - 1);
              }
            }}
          >
            «
          </a>
        </li>
        {arrayNumberOfPage.map(number => {
          return (
            <li
              className={`page-item ${pageActive === number ? 'active' : ''}`}
              onClick={() => setPageActive(number)}
              key={number}
            >
              <a data-cy="pageLink" className="page-link" href={`#${number}`}>
                {number}
              </a>
            </li>
          );
        })}
        <li
          className={`page-item ${pageActive === numberOfPages ? 'disabled' : ''}`}
        >
          <a
            data-cy="nextLink"
            className={`page-link `}
            href="#next"
            aria-disabled={pageActive === numberOfPages}
            onClick={() => {
              if (pageActive < arrayNumberOfPage.length) {
                setPageActive(pageActive + 1);
              }
            }}
          >
            »
          </a>
        </li>
      </ul>
      <ul>
        {items.map((item, index) => {
          return index < end && index >= start - 1 ? (
            <li data-cy="item" key={item}>
              {item}
            </li>
          ) : (
            <></>
          );
        })}
      </ul>
    </div>
  );
};

export default App;
