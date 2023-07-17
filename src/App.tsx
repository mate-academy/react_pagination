import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

const items = getNumbers(1, 42).map(n => `Item ${n}`);

const getItemsList = (
  arr:string[],
  listOfItems: number,
  currentPage:number,
) => {
  const startIndex = (currentPage - 1) * listOfItems;
  let lastIndex = (currentPage - 1) * listOfItems + listOfItems;

  lastIndex = Math.min(lastIndex, arr.length);

  return {
    visibleItems: arr.slice(startIndex, lastIndex),
    startIndex: startIndex + 1,
    finishIndex: lastIndex,
  };
};

const itemsOnPage = [3, 5, 10, 20];

export const App: React.FC = () => {
  const totalNumber = items.length;

  const [perPage, setPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  const onChangePerPage = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPerPage(+event.target.value);
    setCurrentPage(1);
  };

  const {
    visibleItems,
    startIndex,
    finishIndex,
  } = getItemsList(items, perPage, currentPage);

  const selectPage = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${startIndex} - ${finishIndex} of 42)`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            onChange={onChangePerPage}
            defaultValue="5"
          >
            {itemsOnPage.map(item => (
              <option
                value={item}
                key={item}
              >
                {item}
              </option>
            ))}
          </select>
        </div>

        <label htmlFor="perPageSelector" className="col-form-label col">
          items per page
        </label>
      </div>

      <Pagination
        totalNumber={totalNumber}
        listOfItems={perPage}
        currentPage={currentPage}
        setCurrentPage={selectPage}
      />

      <ul>
        {visibleItems.map(item => (
          <li
            data-cy="item"
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
