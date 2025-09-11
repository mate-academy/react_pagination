import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42).map(n => `Item ${n}`);

export const App: React.FC = () => {
  const itemsQty = items.length;
  const [perPage, setPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  const pageChangeHandle = (page: number) => {
    setCurrentPage(page);
  };

  const handleChangePerPage = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPerPage(+event.target.value);
    setCurrentPage(1);
  };

  // Compute from/to defensively for display
  const from = itemsQty === 0 ? 0 : (currentPage - 1) * perPage + 1;
  const to = Math.min(currentPage * perPage, itemsQty);

  // Derive slice indices from display values
  const sliceStart = from === 0 ? 0 : from - 1;
  const sliceEnd = to;

  const getItems = () => {
    return items.slice(sliceStart, sliceEnd);
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${from} - ${to} of ${itemsQty})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={perPage}
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
        total={itemsQty}
        perPage={perPage}
        currentPage={currentPage}
        onPageChange={pageChangeHandle}
      />

      <ul>
        {getItems().map(el => {
          return (
            <li data-cy="item" key={el}>
              {el}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default App;
