import React, { useState, useEffect } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';
import { useSearchParams } from 'react-router-dom';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items: string[] = getNumbers(1, 42).map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [perPage, setPerPage] = useState<number>(
    Number(searchParams.get('perPage')) || 5,
  );
  const [page, setPage] = useState<number>(
    Number(searchParams.get('page')) || 1,
  );
  const start: number = (page - 1) * perPage;
  const end: number = start + perPage;
  const visibleItem: string[] = items.slice(start, end);
  const startIndex: number = (page - 1) * perPage + 1;
  const endIndex: number = Math.min(page * perPage, items.length);
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPerPage(Number(event.target.value));
    setPage(1);
  };

  useEffect(() => {
    const params: Record<string, string> = {};

    if (page !== 1) {
      params.page = String(page);
    }

    if (perPage !== 5) {
      params.perPage = String(perPage);
    }

    setSearchParams(params);
  }, [page, perPage, setSearchParams]);

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        Page {page} (items {startIndex} - {endIndex} of {items.length})
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            value={perPage}
            className="form-control"
            onChange={handleChange}
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
        currentPage={page}
        onPageChange={setPage}
      />
      <ul>
        {visibleItem.map(item => (
          <li data-cy="item" key={item}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
