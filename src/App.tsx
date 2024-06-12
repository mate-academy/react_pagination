import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination/Pagination';
import { PerPage } from './types/PerPage';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42).map(n => `Item ${n}`);
const total = items.length;

export const App: React.FC = () => {
  const [perPage, setPerPage] = useState<PerPage>('5');
  const [currentPage, setCurrentPage] = useState(1);

  const startItem = +perPage * (currentPage - 1) + 1;
  const endItemCalculation = +perPage * currentPage;
  const endItem = endItemCalculation > total ? total : endItemCalculation;

  const visibleItem = [...items].splice(startItem - 1, +perPage);

  const handlePerPage = (value: PerPage) => {
    setPerPage(value);
    setCurrentPage(1);
  };

  const handleCurrentPage = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        Page {currentPage} (items {startItem} - {endItem} of {items.length})
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            value={perPage}
            className="form-control"
            onChange={event => handlePerPage(event.target.value as PerPage)}
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
        onPageChange={handleCurrentPage}
      />

      <ul>
        {visibleItem.map(item => (
          <li key={item} data-cy="item">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
