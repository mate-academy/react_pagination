import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42).map(n => `Item ${n}`);

const ItemsPerPageSelector: number[] = [3, 5, 10, 20];

interface PaginationOptions {
  itemsPerPage: number;
  currPage: number;
}

const getCurrentItems = (
  totalItems: string[],
  { itemsPerPage, currPage }: PaginationOptions,
): string[] => {
  const getCurrItemsFirstIndex = (currPage - 1) * itemsPerPage;
  const getCurrItemsLastIndex = currPage * itemsPerPage;

  return totalItems.slice(getCurrItemsFirstIndex, getCurrItemsLastIndex);
};

export const App: React.FC = () => {
  const [currPage, setCurrPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(ItemsPerPageSelector[1]);

  const currItems = getCurrentItems(items, { itemsPerPage, currPage });
  const currentFirstItem = items.indexOf(currItems[0]) + 1;
  const currentLastItem = items.indexOf(currItems[currItems.length - 1]) + 1;

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currPage} (items ${currentFirstItem} - ${currentLastItem} of ${items.length})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            value={itemsPerPage}
            className="form-control"
            onChange={event => {
              setCurrPage(1);
              setItemsPerPage(+event.target.value);
            }}
          >
            {ItemsPerPageSelector.map(item => {
              return (
                <option value={item} key={item}>
                  {item}
                </option>
              );
            })}
          </select>
        </div>

        <label htmlFor="perPageSelector" className="col-form-label col">
          items per page
        </label>
      </div>

      <Pagination
        total={items.length}
        perPage={itemsPerPage}
        currentPage={currPage}
        onPageChange={setCurrPage}
      />

      <ul>
        {currItems.map((item, index) => (
          <li key={index} data-cy="item">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
