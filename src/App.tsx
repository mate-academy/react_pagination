/* eslint-disable */
import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

const items = getNumbers(1, 42)
  .map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [chosenPage, setChosenPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const amountOfItems = 42;
  const amountOfPages = Math.ceil(amountOfItems / itemsPerPage);
  const endPoint =  itemsPerPage * chosenPage;
  const startPoint = endPoint - itemsPerPage;
  const pages = [];

  for (let i = 1; i <= amountOfPages; i++) {
    pages.push(i);
  }

  const onPageChange = (pageNumber: number) => {
    setChosenPage(pageNumber);
  }

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        Page {chosenPage} (items {startPoint + 1} - {endPoint <= 42 ? endPoint : 42} of 42)
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            defaultValue={itemsPerPage}
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            onChange={(event) => setItemsPerPage(+event.target.value)}
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
        pages={pages}
        chosenPage={chosenPage}
        onPageChange={onPageChange}
        amountOfPages={amountOfPages}
      />

      <ul>
        {items.slice(startPoint, endPoint).map(item => (
          <li
            key={item}
          >
            {item}
          </li>
        ))}
      </ul>

    </div>
  );
};

export default App;
