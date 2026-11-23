import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { Pagination } from './components/Pagination';
import { getNumbers } from './utils';
import './App.css';

const items = getNumbers(1, 42).map(n => `Item ${n}`);

const PER_PAGE_OPTIONS = [3, 5, 10, 20];
const DEFAULT_PER_PAGE = 5;
const DEFAULT_PAGE = 1;

function getPositiveNumber(value: string | null, fallback: number) {
  const number = Number(value);

  if (!Number.isInteger(number) || number < 1) {
    return fallback;
  }

  return number;
}

export const App: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const perPage = getPositiveNumber(
    searchParams.get('perPage'),
    DEFAULT_PER_PAGE,
  );
  const currentPage = getPositiveNumber(searchParams.get('page'), DEFAULT_PAGE);

  const firstItemIndex = (currentPage - 1) * perPage;
  const visibleItems = items.slice(firstItemIndex, firstItemIndex + perPage);
  const firstItem = visibleItems.length > 0 ? firstItemIndex + 1 : 0;
  const lastItem = firstItemIndex + visibleItems.length;

  const handlePageChange = (page: number) => {
    setSearchParams({
      page: String(page),
      perPage: String(perPage),
    });
  };

  const handlePerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchParams({
      page: String(DEFAULT_PAGE),
      perPage: event.target.value,
    });
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${firstItem} - ${lastItem} of ${items.length})`}
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
            {PER_PAGE_OPTIONS.map(option => (
              <option value={option} key={option}>
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
        total={items.length}
        perPage={perPage}
        currentPage={currentPage}
        onPageChange={handlePageChange}
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
