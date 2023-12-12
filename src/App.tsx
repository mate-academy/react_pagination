import React, { useState } from 'react';
import './App.css';
import { Pagination } from './components/Pagination';

export const App: React.FC = () => {
  const total = 42;
  const [perPage, setPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handlePerPage = (event: any) => {
    setPerPage(event?.target.value);
  };

  const handleCurrentPage = (pageNumber: number) => {
    setCurrentPage(currentPage + pageNumber);
    setPerPage(perPage);
  };

  const getNumbers = (startPage: number): number[] => {
    const start = (startPage - 1) * perPage + 1;
    const end = start + perPage - 1;
    const totalItems = Math.min(total, end);

    return Array.from(
      { length: totalItems - start + 1 }, (_, index) => start + index,
    );
  };

  const items = getNumbers(currentPage)
    .map((n: number) => `Item ${n}`);

  const firstItem = perPage * (currentPage - 1) + 1;
  const lastItem = Math.min(perPage * currentPage, total);

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`${currentPage} (items ${firstItem} - ${lastItem} of ${total})`}
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
        onPageChange={handleCurrentPage}
      />
      <ul>
        {items.map((item: string) => (
          <li data-cy="item">{item}</li>
        ))}
      </ul>

    </div>
  );
};

export default App;
