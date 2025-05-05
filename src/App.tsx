import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42).map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [perPage, setPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  const startIndex: number = (currentPage - 1) * perPage;
  const endIndex: number = startIndex + perPage;
  const currentItems: string[] = items.slice(startIndex, endIndex);

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        Page {currentPage} (items {startIndex === 0 ? 1 : startIndex + 1} -{' '}
        {endIndex > 42 ? '42' : endIndex} of 42)
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
          >
            <option value="3">3</option>
            <option value="5" selected>
              5
            </option>
            <option value="10">10</option>
            <option value="20">20</option>
          </select>
        </div>

        <label htmlFor="perPageSelector" className="col-form-label col">
          items per page
        </label>
      </div>
      <Pagination
        total={items.length} // total number of items to paginate
        perPage={Number(perPage)} // number of items per page
        currentPage={currentPage} /* optional with 1 by default */
        onPageChange={page => setCurrentPage(page)}
      />
      <ul>
        {currentItems.map((item, index) => (
          <li data-cy="item" key={startIndex + index}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
