import React, { useState } from 'react';
import './App.css';
import { Pagination } from './components/Pagination';
import { getNumbers } from './utils';

export const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(3);
  const itemsCount = 42;

  const perPageHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPerPage(+event.currentTarget.value);
    setCurrentPage(1);
  };

  const lastPage = Math.ceil(itemsCount / perPage);

  const fromCount = ((currentPage - 1) * perPage) + 1;
  const toCount = currentPage === lastPage
    ? itemsCount
    : currentPage * perPage;

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage}
        (items ${fromCount} - ${toCount} of ${itemsCount})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={perPage}
            onChange={perPageHandler}
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
        total={itemsCount}
        perPage={perPage}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
      <ul>
        {getNumbers(fromCount, toCount).map(number => (
          <li
            className="item"
            key={number}
            data-cy="item"
          >
            {`Item ${number}`}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
