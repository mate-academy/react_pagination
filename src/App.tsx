import React from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useSearchParams } from 'react-router-dom';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42).map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [total] = React.useState(items.length);

  const pageParam = parseInt(searchParams.get('page') || '1', 10);
  const perPageParam = parseInt(searchParams.get('perPage') || '5', 10);

  const [perPage, setPerPage] = React.useState(perPageParam);
  const [currentPage, setCurrentPage] = React.useState(pageParam);

  React.useEffect(() => {
    setSearchParams({ page: String(currentPage), perPage: String(perPage) });
  }, [currentPage, perPage, setSearchParams]);

  React.useEffect(() => {
    const urlPage = parseInt(searchParams.get('page') || '1', 10);
    const urlPerPage = parseInt(searchParams.get('perPage') || '5', 10);

    if (urlPage !== currentPage) {
      setCurrentPage(urlPage);
    }

    if (urlPerPage !== perPage) {
      setPerPage(urlPerPage);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const visibleItems = items.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage,
  );

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        Page {currentPage} (items {(currentPage - 1) * perPage + 1} -{' '}
        {Math.min(currentPage * perPage, total)} of {total})
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
              setCurrentPage(1);
            }}
          >
            <option value="3" key="3">
              3
            </option>
            <option value="5" key="5">
              5
            </option>
            <option value="10" key="10">
              10
            </option>
            <option value="20" key="20">
              20
            </option>
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

export default App;
