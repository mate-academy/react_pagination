import React from 'react';
import { useSearchParams } from 'react-router-dom';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42).map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Math.max(1, Number(searchParams.get('page')) || 1);
  const perPage = Math.max(1, Number(searchParams.get('perPage')) || 5);

  const setCurrentPage = (p: number) =>
    setSearchParams((prev: URLSearchParams) => {
      const next = new URLSearchParams(prev);

      if (p <= 1) {
        next.delete('page');
      } else {
        next.set('page', String(Math.floor(p)));
      }

      return next;
    });

  const setPerPage = (n: number) =>
    setSearchParams((prev: URLSearchParams) => {
      const next = new URLSearchParams(prev);

      if (n === 5) {
        next.delete('perPage');
      } else {
        next.set('perPage', String(Math.max(1, Math.floor(n))));
      }

      next.delete('page');

      return next;
    });

  const itemsPerPage = items.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage,
  );

  const onPageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        Page {currentPage} (items {(currentPage - 1) * perPage + 1} -{' '}
        {Math.min(currentPage * perPage, items.length)} of {items.length})
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <Pagination
            total={items.length}
            perPage={perPage}
            currentPage={currentPage}
            onPageChange={onPageChange}
          />

          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={perPage}
            onChange={event => {
              setPerPage(Number(event.target.value));
              setCurrentPage(1);
            }}
          >
            <option value="3">3</option>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
          </select>
        </div>

        {/* <label htmlFor="perPageSelector" className="col-form-label col">
          items per page
        </label> */}
      </div>

      <ul>
        {itemsPerPage.map((item, index) => (
          <li data-cy="item" key={index}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
