import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getNumbers } from './utils';

import './App.css';
import { Pagination } from './components/Pagination';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42)
  .map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(+(searchParams.get('page') || 1));
  const [perPage, setPerPage] = useState(+(searchParams.get('perPage') || 5));

  useEffect(() => {
    const params = new URLSearchParams();

    params.append('page', `${page}`);
    params.append('perPage', `${perPage}`);

    setSearchParams(params.toString());
  }, [perPage, page]);

  const from = ((page - 1) * perPage) + 1;
  const to = Math.min(items.length, page * perPage);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${page} (items ${from} - ${to} of ${items.length})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={perPage}
            onChange={event => {
              setPerPage(+event.target.value);
              setPage(1);
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
        total={items.length}
        perPage={perPage}
        currentPage={page}
        onPageChange={handlePageChange}
      />

      <ul>
        {items.slice(from - 1, to).map(item => (
          <li data-cy="item" key={item}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
