import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

const generateItems = (count: number) => getNumbers(1, count).map((n) => `Item ${n}`);

const perPageOptions = [3, 5, 10, 20];

export const App: React.FC = () => {
  const [currentPage, setSelectedPage] = useState(1);
  const [perPage, setPerPage] = useState(5);

  const handlePerPage = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPerPage(Number(event.target.value));
    setSelectedPage(1);
  };

  const items = generateItems(42);
  const total = items.length;
  const firstItem = (currentPage - 1) * perPage;
  const lastItem = Math.min(perPage * currentPage, total);
  const visibleItems = items.slice(firstItem, lastItem);

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${firstItem + 1} - ${lastItem} of ${total})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={perPage}
            onChange={handlePerPage}
          >
            {perPageOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
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
        onPageChange={(page) => setSelectedPage(page)}
      />

      <ul>
        {visibleItems.map((item) => (
          <li data-cy="item" key={item}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
