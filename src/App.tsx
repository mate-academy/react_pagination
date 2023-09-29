import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

const items = getNumbers(1, 42)
  .map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [perPage, setPerPage] = useState(5);
  const [pageNumber, setPageNumber] = useState(1);

  let lastItem = perPage * pageNumber;
  const firstItem = lastItem - perPage;

  if (lastItem > 42) {
    lastItem = 42;
  }

  const currentItems = items.slice(firstItem, lastItem);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPerPage(+event.target.value);
    setPageNumber(1);
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${pageNumber} (items ${firstItem + 1} - ${lastItem} of 42)`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={perPage}
            onChange={handleChange}
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
        perPage={perPage}
        currentPage={pageNumber}
        onPageChange={setPageNumber}
      />

      <ul>
        {currentItems.map(el => (
          <li data-cy="item" key={el}>{el}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
