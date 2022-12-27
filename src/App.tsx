import React, { ChangeEvent, useState } from 'react';
import './App.css';
import { Pagination } from './components/Pagination';
import { getNumbers } from './utils';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42)
  .map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(5);

  const handlePerPageChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setPerPage(+event.target.value);
    setCurrentPage(1);
  };

  const total = items.length;

  const firstItem = (currentPage - 1) * perPage + 1;

  const lastItem = firstItem + perPage > total
    ? total
    : firstItem + perPage - 1;

  const handlePageChange = (page: number | string) => {
    if (typeof page === 'number') {
      setCurrentPage(page);
    }

    if (page === 'prev') {
      setCurrentPage(prevPage => prevPage - 1);
    }

    if (page === 'next') {
      setCurrentPage(prevPage => prevPage + 1);
    }
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${firstItem} - ${lastItem} of ${total})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            className="form-control"
            data-cy="perPageSelector"
            id="perPageSelector"
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
        firstItem={firstItem}
        lastItem={lastItem}
        items={items}
      />
    </div>
  );
};

export default App;
