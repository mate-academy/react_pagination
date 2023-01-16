import React, { useState } from 'react';
import './App.css';
import { Pagination } from './components/Pagination';
import { getNumbers } from './utils';

// eslint-disable-next-line @typescript-eslint/no-unused-vars

export const App: React.FC = () => {
  const [perPage, setPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [total] = useState(42);

  const firstItem = (currentPage - 1) * perPage + 1;
  const lastItem = Math.min(perPage * currentPage, total);
  const itemsPerPage = getNumbers(firstItem, lastItem);

  const handleItemsPerPage = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentPage(1);
    setPerPage(+event.target.value);
  };

  const handleOnPageChange = (page: number | string) => {
    if (typeof page === 'number') {
      setCurrentPage(page);
    } else if (page === 'prev') {
      setCurrentPage(current => current - 1);
    } else if (page === 'next') {
      setCurrentPage(current => current + 1);
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
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={perPage}
            onChange={handleItemsPerPage}
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
        onPageChange={handleOnPageChange}
      />
      <ul>
        {itemsPerPage.map(item => (
          <li
            key={item}
            data-cy="item"
          >
            {`Item ${item}`}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
