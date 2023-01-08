import type { FC } from 'react';
import { useState, useEffect } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42)
  .map(n => `Item ${n}`);

export const App: FC = () => {
  const [perPage, setPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  const pageChange = (action: number | string) => {
    switch (action) {
      case 'next':
        setCurrentPage((prev) => prev + 1);
        break;
      case 'prev':
        setCurrentPage((prev) => prev - 1);
        break;
      default:
        setCurrentPage(Number(action));
    }
  };

  const pageCount = Math.ceil(items.length / perPage);

  const firstItem = (currentPage - 1) * perPage + 1;
  const lastItem = Math.min(currentPage * perPage, items.length);

  useEffect(() => {
    if (currentPage > pageCount) {
      setCurrentPage(1);
    }
  }, [perPage]);

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${firstItem} - ${lastItem} of ${items.length})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={perPage}
            onChange={(e) => setPerPage(Number(e.target.value))}
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
        currentPage={currentPage}
        onPageChange={pageChange}
        pages={pageCount}
      />

      <ul>
        {items.map((item, index) => {
          const start = (currentPage - 1) * perPage;
          const end = start + perPage;

          if (index >= start && index < end) {
            return <li data-cy="item" key={item}>{item}</li>;
          }

          return null;
        })}

      </ul>
    </div>
  );
};
