import React, { useState } from 'react';

import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

const total = 42;

function prepareItems(
  itemsArray: number[],
  itemPerPage: number,
  currentPage: number,
): number[] {
  const firstNumber = (currentPage - 1) * itemPerPage + 1;
  let lastNumber = itemPerPage * currentPage;

  if (lastNumber > itemsArray[itemsArray.length - 1]) {
    lastNumber = itemsArray[itemsArray.length - 1];
  }

  const indexOfFirst = itemsArray.indexOf(firstNumber);
  const indexOfLast = itemsArray.indexOf(lastNumber);

  return itemsArray.slice(indexOfFirst, indexOfLast + 1);
}

export const App: React.FC = () => {
  const [perPage, setPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  let items = getNumbers(1, total);

  items = prepareItems(items, perPage, currentPage);

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        Page {currentPage} (items {items[0]} - {items[items.length - 1]} of{' '}
        {total})
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={perPage}
            onChange={event => {
              setPerPage(parseInt(event.target.value));
              setCurrentPage(1);
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
        total={total}
        perPage={perPage}
        currentPage={currentPage}
        onPageChange={page => {
          setCurrentPage(page);
        }}
      />
      <ul>
        {items.map((item, index) => {
          return (
            <li key={index} data-cy="item">
              {`Item ${item}`}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default App;
