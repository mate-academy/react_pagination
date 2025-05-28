import React, { useState } from 'react';

import './App.css';

import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';
import { StratureIDAndBody } from './types/StratureIDAndBody';
import { SELET_OPTION } from './constants';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items: string[] = getNumbers(1, 42).map(n => `Item ${n}`);

const itemsWithID: StratureIDAndBody[] = items.map((item, idx) => {
  return {
    id: idx,
    body: item,
    byNumber: idx,
  };
});

type FiltereItems = (
  a: StratureIDAndBody[],
  b: number,
  c: number,
) => StratureIDAndBody[];

const filtereItems: FiltereItems = (elements, perPage, currentPage) => {
  const filteredItems = elements.filter((item, idx) => {
    const lastElementInPage = perPage * currentPage;
    const firstElementInPage = lastElementInPage - perPage;

    return idx >= firstElementInPage && idx < lastElementInPage;
  });

  return filteredItems;
};

const findLastElementOnPage = (
  perPage: number,
  currentPage: number,
): number => {
  return Number(perPage) * Number(currentPage) > itemsWithID.length
    ? itemsWithID.length
    : Number(perPage) * Number(currentPage);
};

const findFirstElementOnPage = (page: StratureIDAndBody[]): number => {
  return (page[0].byNumber ?? 0) + 1;
};

export const App: React.FC = () => {
  const [perPage, setPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  const page = filtereItems(itemsWithID, perPage, currentPage);
  const firstElementOnPage = findFirstElementOnPage(page);
  const lastElementOnPage = findLastElementOnPage(perPage, currentPage);

  const handleOnChangeItemsPerPage = (value: string) => {
    return setPerPage(Number(value)), setCurrentPage(1);
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        Page {currentPage} (items {firstElementOnPage} - {lastElementOnPage} of
        42)
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={perPage}
            onChange={event => {
              handleOnChangeItemsPerPage(event.target.value);
            }}
          >
            {Object.entries(SELET_OPTION).map(([key, val]) => {
              return (
                <option key={key} value={val}>
                  {val}
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
        total={itemsWithID.length}
        perPage={perPage}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />

      <ul>
        {page.map(el => {
          return (
            <li key={el.id} data-cy="item">
              {el.body}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default App;
