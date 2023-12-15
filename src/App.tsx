import React, { useState } from 'react';
import './App.css';
import { Pagination } from './components/Pagination';

export const App: React.FC = () => {
  const total = 42;
  const [perPage, setPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPagePages = Math.ceil(total / perPage);
  const perPageOptions = [3, 5, 10, 20];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handlePerPage = (event: any) => {
    setPerPage(event?.target.value);
    setCurrentPage(1);
  };

  const handleCurrentPage = (pageNumber: number) => {
    if (pageNumber !== 0) {
      const newPage = currentPage + pageNumber;

      if (newPage >= 1 && newPage <= totalPagePages) {
        setCurrentPage(newPage);
      }
    }
  };

  const firstItem = perPage * (currentPage - 1) + 1;
  const lastItem = Math.min(perPage * currentPage, total);

  const getNumbers = (): number[] => {
    const start = firstItem;
    const end = lastItem;
    const totalItems = end - start + 1;

    const newNumbers = Array.from(
      { length: totalItems },
      (_, index) => start + index,
    );

    return newNumbers;
  };

  const items = getNumbers()
    .map((n: number) => `Item ${n}`);

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${firstItem} - ${lastItem} of ${total})`}
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
            {perPageOptions.map((option: number) => (
              <option key={option} value={option}>{option}</option>
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
        onPageChange={handleCurrentPage}
      />
      <ul>
        {items.map((item: string) => (
          <li data-cy="item" key={item}>{item}</li>
        ))}
      </ul>

    </div>
  );
};

export default App;
