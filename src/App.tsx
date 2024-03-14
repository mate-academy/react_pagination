import React, { useState } from 'react';
import cn from 'classnames';
import './App.css';
import { getNumbers } from './utils';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42).map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [optionVal, setOptionVal] = useState('3');
  const [pagesNr, setpagesNr] = useState(items.length / +optionVal);
  const [activePage, setActivePage] = useState(0);

  const handleActivePage = (page: number) => {
    setActivePage(page);
  };

  const handleOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setOptionVal(event.target.value);
    setpagesNr(items.length / +event.target.value);
  };

  const pageNumber = [];

  for (let i = 0; i < pagesNr; i += 1) {
    pageNumber.push(i);
  }

  const startFromElement = +optionVal * activePage + 1;
  const endOnElement = Math.min(
    +optionVal * activePage + +optionVal,
    items.length,
  );
  const itemsList = getNumbers(startFromElement, endOnElement);

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        Page {activePage + 1} (items {`${startFromElement} - ${endOnElement}`}{' '}
        of {items.length})
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={optionVal}
            onChange={handleOptionChange}
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
        <li className="page-item disabled">
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled="true"
          >
            «
          </a>
        </li>
        {pageNumber.map(item => {
          return (
            <li
              key={item}
              className={`page-item ${cn({ active: activePage === item })}`}
            >
              <a
                onClick={() => handleActivePage(item)}
                data-cy="pageLink"
                className="page-link"
                href={`#${item + 1}`}
              >
                {item + 1}
              </a>
            </li>
          );
        })}

        <li className="page-item">
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled="false"
          >
            »
          </a>
        </li>
      </ul>
      <ul>
        {itemsList.map(item => {
          return (
            <li key={item} data-cy="item">
              Item {item}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default App;
