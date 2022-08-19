import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';

import { Pagination } from './components/Pagination';

export const App: React.FC = () => {
  const [currPage, setCurrPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const amountOfItems = 42;

  const items = getNumbers(1, amountOfItems)
    .map(n => `Item ${n}`);

  const firstItemOnPage = ((currPage - 1) * itemsPerPage) + 1;
  const lastItemOnPage = currPage * itemsPerPage < amountOfItems
    ? currPage * itemsPerPage
    : amountOfItems;

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currPage} (items ${firstItemOnPage} - ${lastItemOnPage} of ${amountOfItems})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            defaultValue={itemsPerPage}
            onChange={(event) => {
              setItemsPerPage(+event.target.value);
              setCurrPage(1);
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

      <Pagination
        total={amountOfItems}
        perPage={itemsPerPage}
        currentPage={currPage}
        onPageChange={setCurrPage}
      />
      <ul>
        {items.slice((currPage - 1) * itemsPerPage, currPage * itemsPerPage)
          .map(item => (
            <li data-cy="item">{item}</li>
          ))}
      </ul>
    </div>
  );
};

export default App;
