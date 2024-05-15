import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42).map(n => `Item ${n}`);
const total = items.length;

export const App: React.FC = () => {
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currPage, setCurrPage] = useState(1);

  const numOfPages = Math.ceil(items.length / itemsPerPage);

  const elements = currPage * itemsPerPage;

  const fromItem = (currPage - 1) * itemsPerPage + 1;
  const toItem = elements > total ? total : elements;

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        Page {currPage} (items {fromItem} - {toItem} of {total})
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            onChange={event => {
              setItemsPerPage(+event.target.value);
              setCurrPage(() => {
                const defPage = 1;

                window.location.hash = `#${defPage}`;

                return defPage;
              });
            }}
            defaultValue={5}
          >
            {[3, 5, 10, 20].map((option, ind) => (
              <option value={option} key={ind}>
                {option}
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
        perPage={itemsPerPage}
        onPageChange={page => {
          if (page === currPage) {
            return;
          }

          if (page >= 1 && page <= numOfPages) {
            setCurrPage(page);
          }
        }}
        currentPage={currPage}
      />

      <ul>
        {getNumbers(fromItem, toItem).map(item => (
          <li data-cy="item" key={item}>
            Item {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
