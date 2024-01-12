import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items: string[] = getNumbers(1, 42)
  .map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(3);

  const totalPages = items.length;
  const firstVisibleItem = (currentPage * itemsPerPage) - itemsPerPage;
  const lastVisibleItem = (firstVisibleItem + itemsPerPage - 1) <= totalPages
    ? firstVisibleItem + itemsPerPage
    : items.length;

  const visibleArray = items.slice(firstVisibleItem, lastVisibleItem);

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${firstVisibleItem + 1} - ${lastVisibleItem} of ${totalPages})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            onChange={(event) => {
              setItemsPerPage(+(event.target.value));
              setCurrentPage(1);
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
        total={totalPages}
        perPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={(page) => {
          if (page !== currentPage) {
            setCurrentPage(page);
          }
        }}
      />

      <ul>
        {visibleArray.map((item) => (
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

export default App;
