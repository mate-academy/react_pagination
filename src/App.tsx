import { FC, useEffect, useState } from 'react';
import { Pagination } from './components/Pagination';

import { getNumbers } from './utils';
import './App.css';

const items = getNumbers(1, 42)
  .map(n => `Item ${n}`);

export const App: FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(5);

  const [
    visibleItems,
    setVisibleItems,
  ] = useState(items.slice(0, perPage));

  const total = items.length;
  const from = currentPage * perPage - perPage + 1;
  const to = Math.min(total, currentPage * perPage);

  useEffect(() => {
    const newItems = items.slice(
      (currentPage - 1) * perPage,
      currentPage * perPage,
    );

    setVisibleItems(newItems);
  }, [currentPage, perPage]);

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage}`}
        {` (items ${from} - ${to} `}
        {`of ${total})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={perPage}
            onChange={(event) => {
              setPerPage(+event.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="3">3</option>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
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
        total={total}
        perPage={perPage}
        currentPage={currentPage}
        onPageChange={(page: number) => {
          setCurrentPage(page);
        }}
      />

      <ul>
        {visibleItems.map(item => (
          <li
            key={item}
            data-cy="item"
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};
