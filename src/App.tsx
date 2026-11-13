import React from 'react';
import { useSearchParams } from 'react-router-dom';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

const items = getNumbers(1, 42).map(n => `Item ${n}`);
const DEFAULT_PAGE = 1;
const DEFAULT_PER_PAGE = 5;

export const App: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const perPageParam = Number(searchParams.get('perPage'));
  const perPage = perPageParam > 0 ? perPageParam : DEFAULT_PER_PAGE;

  const total = items.length;
  const totalPages = Math.ceil(total / perPage);

  const pageParam = Number(searchParams.get('page'));
  const currentPage =
    pageParam >= 1 && pageParam <= totalPages ? pageParam : DEFAULT_PAGE;

  const startIndex = (currentPage - 1) * perPage;
  const endIndex = Math.min(startIndex + perPage, total);
  const visibleItems = items.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    const nextParams = new URLSearchParams(searchParams);

    nextParams.set('page', String(page));
    nextParams.set('perPage', String(perPage));
    setSearchParams(nextParams);
  };

  const handlePerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const nextPerPage = Number(event.target.value);
    const nextParams = new URLSearchParams(searchParams);

    nextParams.set('page', String(DEFAULT_PAGE));
    nextParams.set('perPage', String(nextPerPage));
    setSearchParams(nextParams);
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${startIndex + 1} - ${endIndex} of ${total})`}
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
        {visibleItems.map(item => (
          <li key={item} data-cy="item">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
