import React, { useState } from 'react';

import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

const items = getNumbers(1, 42)
  .map((n: number) => `Item ${n}`);

function getCurrentItems(currentPage:number, perPage: number): string[] {
  if (currentPage === 1) {
    return [...items].splice(0, perPage);
  }

  return [...items].splice((currentPage - 1) * perPage, perPage);
}

export const App: React.FC = () => {
  const [perPage, setPerPage] = useState('5');
  const [currentPage, setCurrentPage] = useState(1);
  const currentItems: string[] = getCurrentItems(+currentPage, +perPage);
  const firstItem = currentItems[0]?.split(' ')[1];
  const lastItem = currentItems[currentItems.length - 1]?.split(' ')[1];
  const message = `Page ${currentPage} (items ${firstItem} - ${lastItem} of 42)`;

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {message}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            value={perPage}
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            onChange={(event) => {
              setPerPage(event.target.value);
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
        total="42"
        perPage={perPage}
        currentPage={currentPage}
        onPageChange={(page) => {
          setCurrentPage(page);
        }}
      />

      <ul>
        {[...currentItems].map(el => (
          <li data-cy="item" key={el}>{el}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
