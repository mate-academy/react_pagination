import { useSearchParams } from 'react-router-dom';
import React from 'react';
import './App.css';
import { Pagination } from './components/Pagination';
import { ALLOWED_PER_PAGE, items } from './constants';

// eslint-disable-next-line @typescript-eslint/no-unused-vars

export const App: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const rawPerPage = Number(searchParams.get('perPage'));
  const perPage = ALLOWED_PER_PAGE.includes(rawPerPage) ? rawPerPage : 5;

  const totalPages = Math.ceil(items.length / perPage);

  const rawPage = Number(searchParams.get('page')) || 1;
  const currentPage = Math.max(1, Math.min(rawPage, totalPages));

  const firstElementIndex = (currentPage - 1) * perPage;
  const lastElementIndex = currentPage * perPage;
  const currentItems = items.slice(firstElementIndex, lastElementIndex);

  const handlePerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newPerPage = event.target.value;

    setSearchParams({ page: '1', perPage: newPerPage });
  };

  const handlePerChange = (newPage: number) => {
    setSearchParams({ page: String(newPage), perPage: String(perPage) });
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        Page {currentPage} (items {firstElementIndex + 1} - {''}
        {Math.min(lastElementIndex, items.length)} of {items.length})
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
        total={items.length}
        perPage={perPage}
        currentPage={currentPage}
        onPageChange={handlePerChange}
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
