import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

const items = getNumbers(1, 42)
  .map(n => `Item ${n}`);

const getPreparedData = (arr:string[], perPage: number, currentPage:number) => {
  const startIndex = (currentPage - 1) * perPage;
  let finishIndex = (currentPage - 1) * perPage + perPage;

  finishIndex = Math.min(finishIndex, arr.length);

  return {
    visibleItems: arr.slice(startIndex, finishIndex),
    startIndex: startIndex + 1,
    finishIndex,
  };
};

const perPageArray = [3, 5, 10, 20];

export const App: React.FC = () => {
  const [perPage, setPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const total = items.length;

  const changePerPage = (value: number) => {
    setPerPage(value);
    setCurrentPage(1);
  };

  const {
    visibleItems,
    startIndex,
    finishIndex,
  } = getPreparedData(items, perPage, currentPage);

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
            value={perPage}
            onChange={(e) => changePerPage(+e.target.value)}
          >
            { perPageArray.map((value) => (
              <option
                value={value}
                key={value}
              >
                {value}
              </option>
            ))}
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
        onPageChange={(page: number) => {
          setCurrentPage(page);
        }}
      />

      <ul>
        { visibleItems.map(item => (
          <li data-cy="item" key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
