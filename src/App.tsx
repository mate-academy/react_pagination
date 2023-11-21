import React from 'react';
import './App.css';
import {
  Route, Routes, useNavigate, useSearchParams,
} from 'react-router-dom';
import { Pagination } from './components/Pagination';
import { items } from './items';
import { getSearchWith } from './searchHelper';

export const App: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const handleOnSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    let newSearchParams = getSearchWith(searchParams, 'page', 1);

    newSearchParams = getSearchWith(
      newSearchParams,
      'perPage',
      +e.target.value,
    );

    navigate(`?${newSearchParams}`);
  };

  const page = searchParams.get('page') !== null
    ? Number(searchParams.get('page'))
    : 1;
  const perPage = searchParams.get('perPage') !== null
    ? Number(searchParams.get('perPage'))
    : 5;

  const firstDisplayedItem = page * perPage - perPage + 1;
  const lastDisplayedItem = page * perPage > items.length
    ? items.length
    : page * perPage;

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        Page
        {' '}
        {page}
        {' '}
        (items
        {' '}
        {firstDisplayedItem}
        {' '}
        -
        {' '}
        {lastDisplayedItem}
        {' '}
        of
        {' '}
        {items.length}
        )
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={perPage}
            onChange={(e) => handleOnSelect(e)}
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

      <Routes>
        <Route
          path="/"
          element={(
            <Pagination
              total={items.length}
              perPage={perPage}
              currentPage={page}
            />
          )}
        />
      </Routes>
    </div>
  );
};

export default App;
