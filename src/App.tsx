import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

const items = getNumbers(1, 42)
  .map(n => `Item ${n}`);

const defaultPerPage = 5;

export const App: React.FC = () => {
  const [perPage, setPerPage] = useState(defaultPerPage);
  const [currentPage, setCurrentPage] = useState(1);

  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  const perPageHandler: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
    const { value } = e.target;

    setPerPage(Number(value));
    setCurrentPage(1);
  };

  const currentStart = perPage * (currentPage - 1) + 1;
  const currentEnd = (currentStart + perPage - 1) > items.length
    ? items.length
    : currentStart + perPage - 1;
  const currentNumbers = items.slice(currentStart - 1, currentEnd);

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${currentStart} - ${currentEnd} of ${items.length})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            onChange={perPageHandler}
            value={perPage}
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
        total={items.length}
        perPage={perPage}
        currentPage={currentPage}
        onPageChange={onPageChange}
      />
      <ul>
        {currentNumbers.map(
          number => <li data-cy="item" key={number}>{number}</li>,
        )}
      </ul>
    </div>
  );
};

export default App;
