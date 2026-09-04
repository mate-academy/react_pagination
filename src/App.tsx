import { useSearchParams } from 'react-router-dom';
import React from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42).map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  function onDataChange(changedData: string, value: string) {
    const params = new URLSearchParams(searchParams);

    params.set(changedData, value);

    setSearchParams(params);
  }

  const totalPages = items.length;
  const perPage = Number(searchParams.get('perPage')) || 5;

  const maxPages = Math.ceil(totalPages / perPage);

  let currentPage = Number(searchParams.get('page')) || 1;

  if (currentPage <= 0 || currentPage > maxPages) {
    currentPage = 1;
  }

  const currentPageMinItems = (currentPage - 1) * perPage + 1;
  const currentPageMaxItems = perPage * currentPage;

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage}`}
        {` (items ${currentPageMinItems <= totalPages ? currentPageMinItems : items.length}`}
        {` - ${currentPageMaxItems >= totalPages ? totalPages : currentPageMaxItems}`}
        {` of ${totalPages})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            onChange={event =>
              onDataChange('perPage', String(event.target.value))
            }
            value={perPage}
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
        total={totalPages}
        perPage={perPage}
        currentPage={currentPage}
        onPageChange={(page: number) => onDataChange('page', String(page))}
      />
      <ul>
        {items.slice(currentPageMinItems - 1, currentPageMaxItems).map(item => {
          return (
            <li data-cy="item" key={item}>
              {item}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default App;
