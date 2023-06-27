import React, { useState } from 'react';
import './App.css';
import { Pagination } from './components/Pagination';

const getNumbers = (start: number, end: number) => {
  return Array.from({ length: end - start + 1 }, (_, index) => start + index);
};

export const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const total = 42;
  const [perPage, setPerPage] = useState(5);
  const nextPage = currentPage + 1;

  const firstItemOnPage = ((currentPage - 1) * perPage) + 1;
  const lastItemOnPage = Math.min(perPage * currentPage, total);
  const itemsOnPage = getNumbers(firstItemOnPage, lastItemOnPage).map(n => `Item ${n}`);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleChangePerPage = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPerPage(+event.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page
        ${currentPage} (items ${firstItemOnPage} - ${lastItemOnPage} 
          of ${total}
        )`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="prevPageSelector"
            id="prevPageSelector"
            className="form-control"
            value={perPage}
            onChange={handleChangePerPage}
          >
            <option value={3}>3</option>
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
          </select>
        </div>

        <label htmlFor="prevPageSelector" className="col-form-label col">
          items per page
        </label>
      </div>

      <Pagination
        total={total}
        perPage={perPage}
        currentPage={currentPage}
        nextPage={nextPage}
        onPageChange={handlePageChange}
      />

      <ul>
        {itemsOnPage.map((item) => (
          <li key={item} data-cy="item">{item}</li>
        ))}
      </ul>
    </div>
  );
};
