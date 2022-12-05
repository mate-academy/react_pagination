import React, { useState } from 'react';
import './App.css';
import { Pagination } from './components/Pagination';
import { getNumbers } from './utils';

export const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setValuesPerPage] = useState(5);

  const totalAmount = 42;

  const firstNum = itemsPerPage * (currentPage - 1) + 1;
  const lastNum = itemsPerPage * currentPage <= totalAmount
    ? itemsPerPage * currentPage
    : totalAmount;

  const items = getNumbers(1, totalAmount);
  const currentItems = items.slice(firstNum - 1, lastNum);

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${firstNum} - ${lastNum} of ${totalAmount})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={itemsPerPage}
            onChange={event => {
              setValuesPerPage(Number(event.target.value));
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
        total={totalAmount}
        perPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />

      <ul>
        {currentItems.map(num => (
          <li data-cy="item" key={num}>
            {`Item ${num}`}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
