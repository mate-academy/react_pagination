import React from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';
import { useSearchParams } from 'react-router-dom';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42).map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = Number(searchParams.get('page')) || 1;
  const perPage = Number(searchParams.get('perPage')) || 5;

  const from = (currentPage - 1) * perPage + 1;
  const to = Math.min(currentPage * perPage, items.length);

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams);

    params.set('page', newPage.toString());
    setSearchParams(params);
  };

  function selectPerPage(event: React.ChangeEvent<HTMLSelectElement>) {
    const params = new URLSearchParams(searchParams);

    params.set('perPage', event.target.value);
    params.set('page', '1');
    setSearchParams(params);
  }

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        Page {`${currentPage} `}
        {`(items ${from} - ${to} of ${items.length})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={perPage}
            onChange={selectPerPage}
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

      {/* Move this markup to Pagination */}

      <Pagination
        total={items.length}
        perPage={perPage}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />

      <ul>
        {items.slice(from - 1, to).map(i => (
          <li key={i} data-cy="item">
            {i}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
