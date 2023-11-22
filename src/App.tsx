import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

const items = getNumbers(1, 42)
  .map(n => `Item ${n}`);

export const App: React.FC = () => {
  const optionArray = [3, 5, 10, 20];
  const [perPage, setPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  let startItem = 0;

  if (currentPage > 1) {
    startItem = perPage * (currentPage - 1);
  }

  let lastItem = startItem + perPage;

  if (lastItem > 42) {
    lastItem = 42;
  }

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${startItem + 1} - ${lastItem} of 42)`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={`${perPage}`}
            onChange={(event) => {
              setPerPage(+event.target.value);
              setCurrentPage(1);
            }}
          >
            {optionArray.map(optionItem => (
              <option
                value={`${optionItem}`}
                key={optionItem}
              >
                {optionItem}
              </option>
            ))}
          </select>
        </div>

        <label
          htmlFor="perPageSelector"
          className="col-form-label col"
        >
          items per page
        </label>
      </div>

      <Pagination
        total={42}
        perPage={perPage}
        currentPage={currentPage}
        onPageChange={(page) => {
          setCurrentPage(page);
        }}
      />
      <ul>
        {items.slice(startItem, lastItem).map((item) => (
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
