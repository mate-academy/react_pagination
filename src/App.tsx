import React, { useState } from 'react';
import './App.css';
import { Pagination } from './components/Pagination';
import { getNumbers } from './utils';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const start = 1;
const end = 42;
const items = getNumbers(start, end)
  .map(n => `${n}`);

export const App: React.FC = () => {
  const defaultPerPage = '5';
  const defaultPage = 1;

  const [perPage, setPerPage] = useState(defaultPerPage);
  const [currentPage, setCurrentPage] = useState(defaultPage);

  const startPage = (currentPage - 1) * Number(perPage);
  const stepPage = startPage + Number(perPage);
  const endPage = stepPage > end ? end : stepPage;

  const visibleItems = items.slice(startPage, endPage);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentPage(1);
    setPerPage(event.target.value);
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${startPage + 1} - ${endPage} of ${items.length})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={perPage}
            onChange={(event) => handleChange(event)}
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
        total={items.length}
        perPage={perPage}
        currentPage={currentPage}
        onPageChange={(page:number) => setCurrentPage(page)}
      />
      <ul>
        {visibleItems.map(item => (
          <li
            data-cy="item"
            key={item}
          >
            {`Item ${item}`}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
