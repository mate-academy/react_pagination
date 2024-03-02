import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

enum PerPageAmount {
  Three = 3,
  Five = 5,
  Ten = 10,
  Twenty = 20,
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42).map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(PerPageAmount.Five);

  const totalAmount = items.length;
  const firstIndex = (currentPage - 1) * perPage;
  const lastIndex = Math.min(currentPage * perPage, totalAmount);
  const currentItems = items.slice(firstIndex, lastIndex);

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        Page {currentPage} (items {firstIndex + 1} - {lastIndex} of{' '}
        {totalAmount})
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={perPage}
            onChange={event => {
              setPerPage(+event.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="3">{PerPageAmount.Three}</option>
            <option value="5">{PerPageAmount.Five}</option>
            <option value="10">{PerPageAmount.Ten}</option>
            <option value="20">{PerPageAmount.Twenty}</option>
          </select>
        </div>

        <label htmlFor="perPageSelector" className="col-form-label col">
          items per page
        </label>
      </div>
      <Pagination
        total={totalAmount}
        perPage={perPage}
        currentPage={currentPage}
        onChangePage={setCurrentPage}
      />
      <ul>
        {currentItems.map(item => (
          <li key={item} data-cy="item">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
