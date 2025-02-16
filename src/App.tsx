import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items: string[] = getNumbers(1, 42).map(n => `Item ${n}`);

function getPages(array: string[], itemsPerPage: number): number[] {
  const pages: number[] = [];

  for (let i = 1; i <= Math.ceil(array.length / itemsPerPage); i++) {
    pages.push(i);
  }

  return pages;
}

function getItems(
  itemsArrey: string[],
  currentPage: number,
  nuberItems: number,
  numberOfPage: number,
) {
  const pages = [];
  let start = 0;

  for (let i = 0; i <= numberOfPage; i++) {
    const page = [];

    for (let n = start; n < nuberItems + start; n++) {
      if (itemsArrey[n]) {
        page.push(itemsArrey[n]);
      }
    }

    start = start + page.length;
    pages.push(page);
  }

  return pages[currentPage - 1];
}

export const App: React.FC = () => {
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [page, setPage] = useState(1);

  const pages = getPages(items, itemsPerPage);

  const visibleItems = getItems(items, page, itemsPerPage, pages.length);
  const pageBegin = (page - 1) * itemsPerPage + 1;
  let pageEnd = (page - 1) * itemsPerPage + itemsPerPage;

  pageEnd = pageEnd > items.length ? items.length : pageEnd;

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        Page {page} (items {pageBegin} - {pageEnd} of {items.length})
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={itemsPerPage}
            onChange={e => {
              setItemsPerPage(+e.target.value);
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

      <Pagination pages={pages} onChange={setPage} currentPage={page} />

      <ul>
        {visibleItems.map(elem => (
          <li data-cy="item" key={elem}>
            {elem}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
