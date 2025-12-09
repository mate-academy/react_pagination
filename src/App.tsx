import React from 'react';
import { Pagination } from './components/Pagination';
import { getNumbers } from './utils';
import { useEffect } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useSearchParams } from 'react-router-dom';

const items = getNumbers(1, 42).map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const pageFromUrl = Number(searchParams.get('page')) || 1;
  const perPageFromUrl = Number(searchParams.get('perPage')) || 5;

  const [currentPage, setCurrentPage] = React.useState(pageFromUrl);
  const [perPage, setPerPage] = React.useState(perPageFromUrl);

  const total = items.length;

  // visible items range
  const firstIndex = (currentPage - 1) * perPage;
  const lastIndex = Math.min(firstIndex + perPage, total);

  const visibleItems = items.slice(firstIndex, lastIndex);

  // sync URL
  useEffect(() => {
    setSearchParams({
      page: String(currentPage),
      perPage: String(perPage),
    });
  }, [currentPage, perPage, setSearchParams]);

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        Page {currentPage} (items {firstIndex + 1} - {lastIndex} of {total})
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={perPage}
            onChange={e => {
              setPerPage(Number(e.target.value));
              setCurrentPage(1); // must return to page 1
            }}
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
        onPageChange={setCurrentPage}
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
