import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42).map(n => `Item ${n}`);

export type Page = {
  total: number;
  perPage: number;
  currentPage: number;
};

export const App: React.FC = () => {
  const perPageSelectors = [3, 5, 10, 20];
  const [perPage, setPerPage] = useState(perPageSelectors[1]);
  const [currentPage, setCurrentPage] = useState(1);

  const listStartsWith = perPage * (currentPage - 1);
  const listEndsWith = Math.min(listStartsWith + perPage - 1, items.length - 1);
  const description = `Page ${currentPage} (items ${listStartsWith + 1} - ${listEndsWith + 1} of ${items.length})`;

  const itemsList = [...items].slice(listStartsWith, listEndsWith + 1);

  const onPageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const changePerPage = (value: number) => {
    setPerPage(value);
    setCurrentPage(1);
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {description}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            value={perPage}
            onChange={e => changePerPage(Number(e.target.value))}
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
          >
            {perPageSelectors.map(selector => (
              <option key={'selector-' + selector} value={selector}>
                {selector}
              </option>
            ))}
          </select>
        </div>

        <label htmlFor="perPageSelector" className="col-form-label col">
          items per page
        </label>
      </div>

      <Pagination
        total={items.length}
        perPage={perPage}
        currentPage={currentPage}
        onPageChange={onPageChange}
      />

      <ul>
        {itemsList.map(item => (
          <li data-cy="item" key={'item-' + item}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
