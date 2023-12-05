import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42)
  .map(n => `Item ${n}`);

export const App: React.FC = () => {
  const total = items.length;
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  const firstItem = currentPage * itemsPerPage - itemsPerPage + 1;
  const lastItem = currentPage * itemsPerPage > total
    ? total
    : currentPage * itemsPerPage;

  const visibleItems = items.slice(firstItem - 1, lastItem);

  function handlePerPageSelect(event: React.ChangeEvent<HTMLSelectElement>) {
    setItemsPerPage(+event.target.value);
    setCurrentPage(1);
  }

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
      Page {currentPage} (items {firstItem} - {lastItem} of {total})
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            onChange={handlePerPageSelect}
            defaultValue={itemsPerPage}
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
        perPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={(pageNum) => setCurrentPage(pageNum)}
      />

      <ul>
        {visibleItems.map(item => <li data-cy="item" key={item}>{item}</li>)}
      </ul>

    </div>
  );
};

export default App;
