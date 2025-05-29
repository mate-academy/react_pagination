import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42).map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [page, setPage] = useState('5');
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        Page {currentPage} (items {Math.min((currentPage - 1) * +page + 1)} -{' '}
        {Math.min(currentPage * +page, items.length)} of {items.length})
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={page}
            onChange={e => {
              setPage(e.target.value);
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
        total={items.length}
        perPage={+page}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        onPageChange={(pg: number) => {
          setCurrentPage(pg);
        }}
      />

      <ul>
        {items.map((item, i) => {
          if (currentPage * +page > i && i >= currentPage * +page - +page) {
            return (
              <li key={item} data-cy="item">
                {item}
              </li>
            );
          }
          return;
        })}
      </ul>
    </div>
  );
};

export default App;
