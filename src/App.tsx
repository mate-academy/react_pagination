import React from 'react';
import './App.css';
import { getNumbers } from './utils';
import { useSearchParams } from 'react-router-dom';
import { Pagination } from './components/Pagination';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42).map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const perPage = String(searchParams.get('perPage') || '5');
  const page = String(searchParams.get('page') || '1');
  const totalItems = items.length;

  const start = +perPage * +page - +perPage;
  const end = Math.min(+perPage * +page, totalItems);

  const handlePageChange = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams);

    params.set('page', String(pageNumber));

    setSearchParams(params);
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${page} (items ${start + 1} - ${end} of ${totalItems})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={perPage}
            onChange={event => {
              const params = new URLSearchParams(searchParams);

              if (page !== '1') {
                params.set('page', '1');
              }

              params.set('perPage', event.target.value);

              setSearchParams(params);
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
        total={totalItems}
        perPage={+perPage}
        currentPage={+page}
        onPageChange={handlePageChange}
      />

      <ul>
        {Array.from({ length: end - start }).map((_, index) => {
          const correctIndex = index + start;

          return (
            <li data-cy="item" key={correctIndex}>
              {items[correctIndex]}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default App;
