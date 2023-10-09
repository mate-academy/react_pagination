import React, { useState } from 'react';
import './App.css';
import { Pagination } from './components/Pagination';

export const App: React.FC = () => {
  const itemsCount = 42;
  let pagesCount = 0;
  const selectorValues: number[] = [3, 5, 10, 20];
  const [selectorValue, setSelectorValue] = useState(selectorValues[1]);
  const [currentPage, setCurrentPage] = useState(1);
  const pages: number[] = [];
  const itemsArr: number[] = [];

  for (let i = 1; i <= selectorValue; i += 1) {
    const resultItem = i + selectorValue * (currentPage - 1);

    itemsArr.push(resultItem);
  }

  const lastItem = itemsArr[itemsArr.length - 1] <= itemsCount
    ? itemsArr[itemsArr.length - 1] : itemsCount;

  for (let i = itemsCount; i > 0; i -= selectorValue) {
    pagesCount += 1;
    pages.push(pagesCount);
  }

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${itemsArr[0]} - ${lastItem} of ${itemsCount})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            defaultValue={selectorValues[1]}
            onChange={(event) => {
              setSelectorValue(Number(event.target.value));
              setCurrentPage(1);
            }}
          >
            {selectorValues.map(value => (
              <option value={value}>
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
        total={itemsCount}
        perPage={selectorValue}
        currentPage={currentPage}
        onPageChange={(page) => {
          setCurrentPage(page);
        }}
      />
    </div>
  );
};

export default App;
