import React from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useSearchParams } from 'react-router-dom';

const items = getNumbers(1, 42).map(n => `Item ${n}`);

const clamp = (v: number, min: number, max: number) =>
  Math.min(max, Math.max(min, v));

export const App: React.FC = () => {
  const [search, setSearch] = useSearchParams();

  const perPageFromUrl = Number(search.get('perPage')) || 5;
  const perPage = [3, 5, 10, 20].includes(perPageFromUrl) ? perPageFromUrl : 5;

  const pagesCount = Math.max(1, Math.ceil(items.length / perPage));

  const pageFromUrl = Number(search.get('page')) || 1;
  const currentPage = clamp(pageFromUrl, 1, pagesCount);

  const startIndex = (currentPage - 1) * perPage;
  const endIndex = Math.min(startIndex + perPage, items.length);
  const visible = items.slice(startIndex, endIndex);

  const firstItemNumber = startIndex + 1;
  const lastItemNumber = endIndex;

  const setPage = (page: number) => {
    if (page === currentPage) {
      return;
    }

    const params = new URLSearchParams(search);

    params.set('page', String(page));
    params.set('perPage', String(perPage));
    setSearch(params, { replace: true });
  };

  const setPerPage = (nextPerPage: number) => {
    const params = new URLSearchParams(search);

    params.set('perPage', String(nextPerPage));
    params.set('page', '1');
    setSearch(params, { replace: true });
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${firstItemNumber} - ${lastItemNumber} of ${items.length})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={perPage}
            onChange={e => setPerPage(Number(e.target.value))}
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
        onPageChange={setPage}
      />

      <ul>
        {visible.map(text => (
          <li key={text} data-cy="item">
            {text}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
