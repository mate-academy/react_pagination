import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

const items = getNumbers(1, 42).map(n => `Item ${n}`);

type NumberOfPage = 3 | 5 | 10 | 20;

export const App: React.FC = () => {
  const [perPage, setPerPage] = useState<NumberOfPage>(5);
  const [currentPage, setCurrentPage] = useState(1);

  const startIndex = (currentPage - 1) * perPage;
  const endIndex = startIndex + perPage;
  const currentItems = items.slice(startIndex, endIndex);

  const handleChangePerPage = (event: React.ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault();
    const newPerPage = Number(event.target.value) as NumberOfPage;

    setPerPage(newPerPage);
    setCurrentPage(1);
  };

  const handlePaginationClick = (page: number) => {
    if (page < 1 || page > Math.ceil(items.length / perPage)) {
      return;
    }

    setCurrentPage(page);
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            onChange={handleChangePerPage}
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
        total={items.length}
        perPage={perPage}
        currentPage={currentPage}
        onPageChange={handlePaginationClick}
      />
      <ul>
        {currentItems.map(item => (
          <li key={item} data-cy="item">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
