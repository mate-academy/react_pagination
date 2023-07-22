import React, { useState } from 'react';
import './App.css';
import { Pagination } from './components/Pagination';
import { getNumbers } from './utils';

const items: string[] = getNumbers(1, 42)
  .map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [amountOfItems, setAmountOfItems] = useState(5);
  const [currentPage, setCurrentPage] = useState(0);
  const [info, setInfo] = useState(`Page 1 (items 1 - 5 of ${items.length})`);

  const startItem: number = currentPage * amountOfItems;
  const pages: number[] = [];

  const newList: string[] = items.slice(startItem, startItem + amountOfItems);

  for (let i = 1; i <= Math.ceil(items.length / amountOfItems); i += 1) {
    pages.push(i);
  }

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {info}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            value={amountOfItems}
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            onChange={(event) => {
              setCurrentPage(0);
              setAmountOfItems(+event.target.value);
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
        newList={newList}
        pages={pages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        setInfo={setInfo}
        items={items}
      />
    </div>
  );
};

export default App;
