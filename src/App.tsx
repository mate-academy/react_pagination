import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

const NUMBERS_PAGE = 42;
const FIRST_PAGE = 1;
const START_PER_PAGE = 5;
const perPagesSelect = [3, 5, 10, 20];
const items = getNumbers(FIRST_PAGE, NUMBERS_PAGE).map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [perPage, setPerPage] = useState(START_PER_PAGE);
  const [page, setPage] = useState(FIRST_PAGE);

  const visibleItems = (arrOfItems: string[]) => {
    const res = [];

    const startIndex = perPage * (page - 1);
    const endIndex = Math.min(startIndex + perPage, NUMBERS_PAGE);

    for (let i = startIndex; i < endIndex; i++) {
      res.push(arrOfItems[i]);
    }

    return res;
  };

  const shownItems = visibleItems(items);

  const handlePage = (chosenPage: number) => {
    setPage(chosenPage);
  };

  const handleChangeSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPerPage(+event.target.value);
    setPage(FIRST_PAGE);
  };

  const startItemIndex = page * perPage - perPage + 1;
  const endItemIndex =
    page * perPage < NUMBERS_PAGE ? page * perPage : NUMBERS_PAGE;

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        Page {page} (items {startItemIndex} - {endItemIndex} of {NUMBERS_PAGE})
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={perPage}
            onChange={handleChangeSelect}
          >
            {perPagesSelect.map(option => (
              <option value={option} key={option}>
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
        total={NUMBERS_PAGE}
        perPage={perPage}
        currentPage={page}
        onPageChange={handlePage}
      />

      <ul>
        {shownItems.map(item => (
          <li data-cy="item" key={item}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};
