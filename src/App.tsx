import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

const items = getNumbers(1, 42).map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [perPage, setPerPage] = useState(
    () => +searchParams.get('perPage')! || 5,
  );
  const [currentPage, setCurrentPage] = useState(
    () => +searchParams.get('page')! || 1,
  );

  const total = items.length;

  const startIndex = (currentPage - 1) * perPage;
  const endIndex = currentPage * perPage;
  const newItems = items.slice(startIndex, endIndex);
  const endValue = Math.min(currentPage * perPage, total);

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        Page {currentPage} (items {startIndex + 1} - {endValue} of {total})
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            value={perPage}
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            onChange={event => {
              const newPerPage = +event.target.value;

              setPerPage(newPerPage);
              setCurrentPage(1);
              setSearchParams({ page: '1', perPage: String(newPerPage) });
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
        onPageChange={page => {
          setCurrentPage(page);
          setSearchParams({ page: String(page), perPage: String(perPage) });
        }}
      />

      <ul>
        {newItems.map(item => (
          <li data-cy="item" key={item}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
