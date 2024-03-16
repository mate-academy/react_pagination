// app.tsx

import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42).map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [optionVal, setOptionVal] = useState(5);
  const [pagesNr, setpagesNr] = useState(items.length / optionVal);
  const [activePage, setActivePage] = useState(0);

  const handleOptionChange = (
    event: React.ChangeEvent<HTMLSelectElement> | number,
  ) => {
    if (typeof event === 'number') {
      setActivePage(event);
    } else {
      setOptionVal(+event.target.value);
      setpagesNr(items.length / +event.target.value);
      setActivePage(0);
    }
  };

  const startFromElement = optionVal * activePage + 1;
  const endOnElement = Math.min(
    optionVal * activePage + optionVal,
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
            onChange={event => {
              handleOptionChange(event);
              setActivePage(0);
            }}
          >
            <option value={3}>3</option>
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
          </select>
        </div>

        <label htmlFor="perPageSelector" className="col-form-label col">
          items per page
        </label>
      </div>

      <Pagination
        total={pagesNr}
        perPage={optionVal}
        currentPage={activePage}
        onPageChange={handleOptionChange}
      />
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
