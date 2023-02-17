import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

const items = getNumbers(1, 42)
  .map(n => `Item ${n}`);

const TOTAL_PAGES = 42;
const SELECT_OPTIONS = [3, 5, 10, 20];

export const App: React.FC = () => {
  const [perPage, setPerPage] = useState(SELECT_OPTIONS[1]);

  const [currentPage, setCurrentPage] = useState(1);

  const maxItemPerPage = perPage * currentPage;
  const firstItemOnPage = maxItemPerPage - perPage;
  const lastItemOnPage = maxItemPerPage > TOTAL_PAGES
    ? TOTAL_PAGES : maxItemPerPage;

  const onPageChange = (page:number) => {
    setCurrentPage(page);
  };

  const onPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPerPage(+e.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${firstItemOnPage + 1} - ${lastItemOnPage} of ${TOTAL_PAGES})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={perPage}
            onChange={onPerPageChange}
          >
            {SELECT_OPTIONS.map(option => (
              <option value={option} key={option}>{option}</option>
            ))}
          </select>
        </div>

        <label htmlFor="perPageSelector" className="col-form-label col">
          items per page
        </label>
      </div>

      <Pagination
        total={TOTAL_PAGES}
        perPage={perPage}
        currentPage={currentPage}
        onPageChange={onPageChange}
      />
      <ul>
        {items.slice(firstItemOnPage, lastItemOnPage).map(item => (
          <li data-cy="item" key={item}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
