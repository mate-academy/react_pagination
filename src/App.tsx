import { FC, useEffect, useState } from 'react';
import { Pagination } from './components/Pagination';

import { getNumbers } from './utils';
import './App.css';

const items = getNumbers(1, 42)
  .map(n => `Item ${n}`);

export const App: FC = () => {
  const defaultItemsPerPage = 5;
  const defaultPage = 1;

  const [currentPage, setCurrentPage] = useState(defaultPage);
  const [itemsPerPage, setItemsPerPage] = useState(defaultItemsPerPage);

  const itemsToDisplay = items.slice(0, itemsPerPage);

  const [
    visibleItems,
    setVisibleItems,
  ] = useState(itemsToDisplay);

  const total = items.length;
  const from = currentPage * itemsPerPage - itemsPerPage + 1;
  const to = Math.min(total, currentPage * itemsPerPage);

  useEffect(() => {
    const newItems = items.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage,
    );

    setVisibleItems(newItems);
  }, [currentPage, itemsPerPage]);

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
            value={itemsPerPage}
            onChange={(event) => {
              setItemsPerPage(Number(event.target.value));
              setCurrentPage(defaultPage);
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
        itemsPerPage={itemsPerPage}
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
