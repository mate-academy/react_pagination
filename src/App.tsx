/* eslint-disable import/no-extraneous-dependencies */
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42).map(n => `Item ${n}`);

const PAGE_OPTIONS = [3, 5, 10, 20];

export const App: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [pageSize, setPageSize] = useState(
    Number(searchParams.get('perPage')) || 5,
  );
  const [currentPage, setCurrentPage] = useState(
    Number(searchParams.get('page')) || 1,
  );
  const totalItems = items.length;

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  const visibleItems = items.slice(startIndex, endIndex);

  const handleChangePageSize = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setPageSize(+event.target.value);
    setCurrentPage(1);
  };

  useEffect(() => {
    setSearchParams({
      page: currentPage.toString(),
      perPage: pageSize.toString(),
    });
  }, [currentPage, pageSize, setSearchParams]);

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        Page {currentPage} (items {startIndex + 1} -{' '}
        {Math.min(endIndex, totalItems)} of {totalItems})
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={pageSize}
            onChange={handleChangePageSize}
          >
            {PAGE_OPTIONS.map(option => (
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
        total={totalItems}
        perPage={pageSize}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
      <ul>
        {visibleItems.map(item => (
          <li data-cy="item" key={item}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
