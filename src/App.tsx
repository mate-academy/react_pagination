import React, { useMemo, useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

const total = 42;

export const App: React.FC = () => {
  const [perPage, setPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  const numberOfPages = Math.ceil(total / perPage);

  const allPages = getNumbers(1, numberOfPages);

  const handlePerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPerPage(+e.target.value);
    setCurrentPage(1);
  };

  const items = useMemo(() => {
    let currentItems: string[] = [];

    if (allPages.length !== currentPage) {
      if (currentPage === 1) {
        currentItems = getNumbers(1, perPage).map((n) => `Item ${n}`);
      }

      currentItems = getNumbers(
        perPage * (currentPage - 1) + 1,
        perPage * currentPage,
      ).map((n) => `Item ${n}`);
    }

    if (allPages.length === currentPage) {
      currentItems = getNumbers(perPage * (currentPage - 1) + 1, total).map(
        (n) => `Item ${n}`,
      );
    }

    return currentItems;
  }, [allPages, currentPage, perPage]);

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${perPage * (currentPage - 1) + 1} - ${items[items.length - 1].slice(5)} of ${total})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={perPage}
            onChange={handlePerPageChange}
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
          setCurrentPage(page);
        }}
      />
      <ul>
        {
          items.map((item, index) => (
            <li
              data-cy="item"
              // eslint-disable-next-line react/no-array-index-key
              key={index}
            >
              {item}
            </li>
          ))
        }
      </ul>
    </div>
  );
};

export default App;
