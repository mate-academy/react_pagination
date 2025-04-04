import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Pagination } from './components/Pagination';
import './App.css';
import { getNumbers } from './utils';

export const App: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [total] = useState(42); // Total number of items
  const [perPage, setPerPage] = useState<number>(
    Number(searchParams.get('perPage')) || 5,
  );
  const [currentPage, setCurrentPage] = useState<number>(
    Number(searchParams.get('page')) || 1,
  );

  const items = getNumbers(1, total);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setSearchParams({ page: String(page), perPage: String(perPage) });
  };

  const handlePerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newPerPage = Number(event.target.value);
    setPerPage(newPerPage);
    setCurrentPage(1);
    setSearchParams({ page: '1', perPage: String(newPerPage) });
  };

  const start = (currentPage - 1) * perPage;
  const end = start + perPage;
  const currentItems = items.slice(start, end);

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        Page {currentPage} (items {start + 1} - {Math.min(end, total)} of{' '}
        {total})
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={perPage}
            onChange={handlePerPageChange}
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
          <li key={item} data-cy="item">
            Item {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
