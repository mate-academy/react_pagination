import React, { useState, ChangeEvent } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

const items = getNumbers(1, 42).map((n) => `Item ${n}`);

export const App: React.FC = () => {
  const [countItem, setCountItem] = useState(5);
  const [page, setPage] = useState(1);
  const startItem = (page - 1) * countItem;
  const endItem = ((startItem + countItem) > items.length)
    ? items.length
    : startItem + countItem;

  const handlePerPageChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    setCountItem(+value);
    setPage(1);
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${page} (items ${startItem + 1} - ${endItem} of ${
          items.length
        })`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={countItem}
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
        total={42}
        perPage={countItem}
        currentPage={page}
        onPageChange={setPage}
      />
      <ul>
        {items.slice(startItem, endItem).map((item) => (
          <li data-cy="item" key={item}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};
