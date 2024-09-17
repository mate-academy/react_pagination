import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

export const App: React.FC = () => {
  const totalItems: number = 42;
  const values = [3, 5, 10, 20];
  const [numItems, setNumItems] = useState(5);

  const [currentPage, setCurrentPage] = useState(1);

  let from = 1;
  let to = numItems;

  if (currentPage && currentPage !== 1) {
    for (let page = 2; page <= currentPage; page++) {
      from = to + 1;
      to = numItems * page;

      if (to > totalItems) {
        to = totalItems;
      }
    }
  }

  const items = getNumbers(from, to).map(n => `Item ${n}`);

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${from} - ${to} of ${totalItems})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={numItems}
            onChange={event => {
              setNumItems(Number(event.target.value));
              setCurrentPage(1);
            }}
          >
            {values.map(value => (
              <option key={value} value={value}>
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
        total={totalItems}
        perPage={numItems}
        currentPage={currentPage}
        onPageChange={page => setCurrentPage(page)}
      />
      <ul>
        {items.map(item => (
          <li key={item} data-cy="item">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
