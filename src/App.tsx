import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination, Props } from './components/Pagination';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42)
  .map(n => `Item ${n}`);

export const App: React.FC = () => {
  const total = 42;
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(5);

  const indexOfLastItem = currentPage * perPage;
  const indexOfFirstItem = indexOfLastItem - perPage;
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange: Props['onPageChange'] = (page) => {
    setCurrentPage(page);
  };

  const handlePerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  const firstItemOnPage = currentPage === 1
    ? 1
    : perPage * (currentPage - 1) + 1;
  const lastItemOnPage = Math.min(perPage * currentPage, total);

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${firstItemOnPage} - ${lastItemOnPage} of ${total})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            onChange={handlePerPageChange}
            value={perPage}
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
        {currentItems.map(item => (
          <li key={item} data-cy="item">{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
