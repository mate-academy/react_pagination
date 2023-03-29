import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42)
  .map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [total] = useState('42');
  const [perPage, setPerPage] = useState('5');
  const [currentPage, setCurrentPage] = useState('1');

  const lastItemIndex = +currentPage * +perPage;
  const firstItemIndex = +lastItemIndex - +perPage;
  const currentPages = items.slice(firstItemIndex, lastItemIndex);

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${firstItemIndex + 1} - ${lastItemIndex} of ${total})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={perPage}
            onChange={event => {
              setPerPage(event.target.value);
              setCurrentPage('1');
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
        total={total}
        perPage={perPage}
        currentPage={currentPage}
        onPageChange={(page) => {
          if (currentPage !== page) {
            setCurrentPage(page);
          }
        }}
      />

      <ul>
        {currentPages.map(page => (
          <li
            data-cy="item"
            key={page}
          >
            {page}
          </li>
        ))}
      </ul>
    </div>
  );
};
