import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

const total = 42;
const options = [3, 5, 10, 20];
const items = getNumbers(1, total)
  .map(n => n);

export const App: React.FC = () => {
  const [perPage, setPerPage] = useState(options[1]);
  const [currentPage, setCurrentPage] = useState(1);

  const perPageSelector = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPerPage(+event.target.value);
    setCurrentPage(1);
  };

  function getPageItems() {
    return items.filter(item => {
      return +item > currentPage * perPage - perPage
        && +item <= currentPage * perPage;
    });
  }

  const pageItems = getPageItems();

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${pageItems[0]} - ${pageItems[pageItems.length - 1]} of ${total})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={perPage}
            onChange={perPageSelector}
          >
            {options.map(option => (
              <option key={option} value={option}>
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
        perPage={perPage}
        currentPage={currentPage}
        onPageChange={(buttonPage) => setCurrentPage(buttonPage)}
      />
      <ul>
        {pageItems.map(item => (
          <li
            key={item}
            data-cy="item"
          >
            {`Item ${item}`}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
