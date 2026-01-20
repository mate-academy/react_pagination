import React from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';
import { useSearchParams } from 'react-router-dom';

const items = getNumbers(1, 42).map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // 👉 ЄДИНЕ джерело істини
  const currentPage = Number(searchParams.get('page')) || 1;
  const perPage = Number(searchParams.get('perPage')) || 5;

  const total = items.length;

  const first = (currentPage - 1) * perPage + 1;
  const last = Math.min(currentPage * perPage, total);

  const itemsOfPage = getNumbers(first, last);

  const handlePageChange = (newPage: number) => {
    setSearchParams({
      page: String(newPage),
      perPage: String(perPage),
    });
  };

  const handlePerPageChange = (newPerPage: number) => {
    setSearchParams({
      page: '1',
      perPage: String(newPerPage),
    });
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        Page {currentPage} (items {first} - {last} of {total})
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={perPage}
            onChange={e => handlePerPageChange(Number(e.target.value))}
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
        onPageChange={handlePageChange}
      />

      <ul>
        {itemsOfPage.map(n => (
          <li data-cy="item" key={n}>
            Item {n}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
