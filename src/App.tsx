import './App.css';
import React from 'react';
import { useSearchParams } from 'react-router-dom';

import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

const items = getNumbers(1, 42);

export const App: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const page = Number(searchParams.get('page')) || 1;
  const perPage = Number(searchParams.get('perPage')) || 5;

  const updateParams = (newPage: number, newPerPage: number = perPage) => {
    setSearchParams({
      page: newPage.toString(),
      perPage: newPerPage.toString(),
    });
  };

  const visibleItems = items.filter(
    (_, index) => index < perPage * page && index >= perPage * (page - 1),
  );

  const firstItem = visibleItems[0];
  const lastItem = visibleItems[visibleItems.length - 1];

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        Page {page} (items {firstItem} - {lastItem} of 42)
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={perPage}
            onChange={event => {
              const newPerPage = Number(event.target.value);

              updateParams(1, newPerPage);
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

      <Pagination total={42} perPage={perPage} />

      <ul>
        {visibleItems.map(item => (
          <li key={item} data-cy="item">
            Item {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
