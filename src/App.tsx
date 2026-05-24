import React from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';
import { useSearchParams } from 'react-router-dom';

const items = getNumbers(1, 42).map(n => `Item ${n}`);
const DEFAULT_PAGE = 1;
const DEFAULT_PER_PAGE = 5;

const getPositiveNumber = (value: string | null, fallback: number) => {
  const parsedValue = Number(value);

  return Number.isInteger(parsedValue) && parsedValue > 0
    ? parsedValue
    : fallback;
};

export const App: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const perPage = getPositiveNumber(
    searchParams.get('perPage'),
    DEFAULT_PER_PAGE,
  );
  const pagesCount = Math.ceil(items.length / perPage);
  const currentPage = Math.min(
    getPositiveNumber(searchParams.get('page'), DEFAULT_PAGE),
    pagesCount,
  );
  const firstVisibleItem = (currentPage - 1) * perPage + 1;
  const lastVisibleItem = Math.min(currentPage * perPage, items.length);
  const visibleItems = items.slice(firstVisibleItem - 1, lastVisibleItem);

  const handlePageChange = (newPage: number) => {
    const newParams = new URLSearchParams(searchParams);

    newParams.set('page', String(newPage));
    setSearchParams(newParams);
  };

  const handlePerPageChange = (newPerPage: number) => {
    const newParams = new URLSearchParams(searchParams);

    newParams.set('perPage', String(newPerPage));
    newParams.set('page', String(DEFAULT_PAGE));

    setSearchParams(newParams);
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${firstVisibleItem} - ${lastVisibleItem} of ${items.length})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            onChange={event => handlePerPageChange(Number(event.target.value))}
            value={perPage}
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
          >
            {[3, 5, 10, 20].map(value => (
              <option key={value} value={value}>
                {value}
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
          <li key={item} data-cy="item">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
