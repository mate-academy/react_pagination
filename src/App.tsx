import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42)
  .map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [perPage, setItemsPerPage] = useState<number>(5);
  const [currentPage, setCurrentPage] = useState<number>(0);

  const startIndex = perPage * currentPage + 1;
  const endIndex = perPage * currentPage + perPage;
  const options = [3, 5, 10, 20];

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage + 1} (items ${startIndex} - ${endIndex > items.length ? items.length : endIndex} of ${items.length})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            onChange={(e) => {
              setCurrentPage(0);
              setItemsPerPage(Number(e.target.value));
            }}
            value={perPage}
          >
            {options.map(option => <option value={option}>{option}</option>)}
          </select>
        </div>

        <label htmlFor="perPageSelector" className="col-form-label col">
          items per page
        </label>
      </div>

      <Pagination
        total={items.length}
        perPage={perPage}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
      <ul>
        {items.slice(startIndex - 1, endIndex)
          .map(item => <li data-cy="item" key={item}>{item}</li>)}
      </ul>
    </div>
  );
};

export default App;
