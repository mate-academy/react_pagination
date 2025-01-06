import React from 'react';
// import { useSearchParams } from 'react-router-dom';
import { useState } from 'react';
import type { ChangeEvent } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42).map(n => `Item ${n}`);

function getItems(itemsArr: string[], currentPage: number, perPage: number) {
  const indStart = (currentPage - 1) * perPage;

  return itemsArr.slice(indStart, indStart + perPage);
}

export const App: React.FC = () => {
  const [perPage, setPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  const visibleItems = getItems(items, currentPage, perPage);
  const itemFrom = visibleItems[0].split(' ');
  const itemTo = visibleItems[visibleItems.length - 1].split(' ');

  const handlerPerPage = (e: ChangeEvent<HTMLSelectElement>) => {
    const newPerPage = e.target.value;

    setPerPage(+newPerPage);
    setCurrentPage(1);
  };

  const handlerOnPageChange = (nextPage: number) => {
    setCurrentPage(nextPage);
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        Page {currentPage} (items {itemFrom[1]} - {itemTo[1]} of 42)
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            onChange={handlerPerPage}
          >
            <option value="3">3</option>
            <option value="5" selected>
              5
            </option>
            <option value="10">10</option>
            <option value="20">20</option>
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
        // onPageChange={(nextPage: number) => {
        //   setCurrentPage(nextPage);
        // }}
        onPageChange={handlerOnPageChange}
      />

      <ul>
        {visibleItems.map(item => (
          <li data-cy="item" key={item}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
