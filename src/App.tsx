import React, { useState } from 'react';
import './App.css';

import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items:string[] = getNumbers(1, 42)
  .map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [itemInPage, setitemInPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  function getVisiblItem(inPage:number, page:number):string[] {
    const arr = items.slice(inPage * page - inPage, inPage * page);

    return arr;
  }

  const visiblItem = getVisiblItem(itemInPage, currentPage);
  const pageCountBegin = itemInPage * currentPage - itemInPage + 1;
  const pageCountEnd = pageCountBegin + itemInPage - 1 > 42
    ? 42
    : pageCountBegin + itemInPage - 1;

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${pageCountBegin} - ${pageCountEnd} of 42)`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={itemInPage}
            onChange={e => {
              setitemInPage(+e.target.value);
              setCurrentPage(1);
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
        total={items.length}
        perPage={itemInPage}
        currentPage={currentPage}
        onPageChange={(page):void => {
          setCurrentPage(page);
        }}
      />
      <ul>
        {visiblItem.map(item => {
          return (
            <li
              data-cy="item"
              key={item}
            >
              {item}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default App;
