import React from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

export const items = getNumbers(1, 42).map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const [perPage, setPerPage] = React.useState(5);

  const startIndex = (currentPage - 1) * perPage;
  const endIndex = startIndex + perPage;
  const visibleItems = items.slice(startIndex, endIndex);

  const total = items.length;
  const firstItem = startIndex + 1;
  const lastItem = Math.min(endIndex, total);

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        Page {currentPage} (items {firstItem} - {lastItem} of {total})
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={perPage}
            onChange={e => {
              setPerPage(Number(e.target.value));
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
        total={total}
        perPage={perPage}
        currentPage={currentPage}
        onPageChange={(page: React.SetStateAction<number>) =>
          setCurrentPage(page)
        }
      />

      <ul>
        {visibleItems.map(item => (
          <li key={item} data-cy="item">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
