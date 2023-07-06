import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42)
  .map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [itemsPerPage, setItemsPerPage] = useState('5');
  const [page, setPage] = useState(1);

  const handleItemsPerPage = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    if (event.target.value !== itemsPerPage) {
      setItemsPerPage(event.target.value);
      setPage(1);
    }
  };

  function handleChangePage(newPage: number) {
    if (page !== newPage) {
      setPage(newPage);
    }
  }

  const itemsCount = items.length;
  const start = (page - 1) * +itemsPerPage;
  const end = start + +itemsPerPage > itemsCount
    ? itemsCount : start + +itemsPerPage;
  const visibleItems = items.slice(start, end);

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${page} (items ${start + 1} - ${end} of ${itemsCount})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            onChange={handleItemsPerPage}
            value={itemsPerPage}
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
        total={itemsCount}
        perPage={+itemsPerPage}
        currentPage={page}
        onPageChange={(newPage) => {
          handleChangePage(newPage);
        }}
      />
      <ul>
        {visibleItems.map((item) => (
          <li data-cy="item" key={item}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
