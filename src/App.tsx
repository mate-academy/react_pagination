import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42).map(n => `Item ${n}`);
const itemsPerPageOptions: number[] = [3, 5, 10, 20];

export const App: React.FC = () => {
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currPage, setCurrPage] = useState(1);

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        Page {currPage} (items {(currPage - 1) * itemsPerPage + 1} -{' '}
        {Math.min(currPage * itemsPerPage, items.length)} of {items.length})
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
              setItemsPerPage(Number(event.target.value));
            }}
          >
            {itemsPerPageOptions.map(item => (
              <option key={item} value={item}>
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
        total={items.length}
        perPage={itemsPerPage}
        currentPage={currPage}
        onPageChange={setCurrPage}
      />

      <ul>
        {items
          .slice((currPage - 1) * itemsPerPage, currPage * itemsPerPage)
          .map((item, index) => (
            <li key={index} data-cy="item">
              {item}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default App;
