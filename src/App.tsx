import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
// const items = getNumbers(1, 42).map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [perPage, setPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  const total = 42;
  // const arrayOfItems = Array.from({ length: total }, (_, i) => i + 1);
  const arrayOfItems = getNumbers(1, total);
  const startItem = (currentPage - 1) * perPage;
  const endItem = currentPage * perPage;
  const itemsToShow = arrayOfItems.slice(startItem, endItem);

  function handlePageChange(page: number) {
    if (page < 1 || page > Math.ceil(total / perPage)) {
      return;
    }

    setCurrentPage(page);
  }

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        Page {currentPage} (items {itemsToShow[0]} -{' '}
        {itemsToShow[itemsToShow.length - 1]} of {total})
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            onChange={e => {
              setPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
            value={perPage}
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

      {/* Move this markup to Pagination */}
      <Pagination
        total={total}
        perPage={perPage}
        currentPage={currentPage}
        onPageChange={handlePageChange}
        itemsToShow={itemsToShow}
      />
    </div>
  );
};

export default App;
