import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

const items = getNumbers(1, 42).map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const totalItems = items.length;
  let itemsOnCurrentPage = `${perPage * (currentPage - 1) + 1} - `;

  if (perPage * currentPage > totalItems) {
    itemsOnCurrentPage += totalItems;
  } else {
    itemsOnCurrentPage += perPage * currentPage;
  }

  const handleChangePerPage = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPerPage(+event.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        Page {currentPage} (items {itemsOnCurrentPage} of {totalItems})
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            defaultValue={5}
            onChange={handleChangePerPage}
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
        totalItems={totalItems}
        perPage={perPage}
        currentPage={currentPage}
        onPageChange={(page: number) => setCurrentPage(page)}
      />

      <ul>
        {getNumbers(1, perPage).map(page => {
          const itemNumber = perPage * (currentPage - 1) + page;

          return itemNumber <= totalItems ? (
            <li data-cy="item" key={itemNumber}>
              Item {itemNumber}
            </li>
          ) : null;
        })}
      </ul>
    </div>
  );
};

export default App;
