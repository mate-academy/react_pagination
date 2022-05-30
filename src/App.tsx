import {
  Route, Routes, Link, useSearchParams,
} from 'react-router-dom';

import React, { useState } from 'react';
import './App.scss';
import Pagination from './components/Pagination/Pagination';

// const getSearchParam(search, param) {
//   const searchParams = new URLSearchParams(search);
//   return searchParams.get()
// }

const App: React.FC = () => {
  const [total] = useState(42);
  const [perPage, setPerPage] = useState(5);
  const [page, setPage] = useState(1);
  const [searchParam, setSearchParam] = useSearchParams();

  const infoLastPage = page * perPage;
  const infoFirstPage = infoLastPage - perPage + 1;

  const onPageChange = (pageNumber:number) => {
    setPage(pageNumber);
  };

  const getPerPage = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const val = event.target.value;

    setPerPage(+val);
    setSearchParam({ perPage: val });
    setPage(1);
  };

  const getPrevPage = () => {
    setPage(prev => prev - 1);
  };

  const getNextPage = () => {
    setPage(prev => prev + 1);
  };

  const perPageUrl = searchParam.get('perPage') || '5';

  return (
    <div className="app">
      <Link
        to="/"
        className="h1"
      >
        Pagination
      </Link>
      <div className="info">
        <p>
          {infoFirstPage}
          {' '}
          -
          {' '}
          {(infoLastPage < total) ? infoLastPage : total}
          {' '}
          of
          {' '}
          {total}
        </p>
      </div>
      <Routes>
        <Route
          path="/"
          element={(
            <Pagination
              onPageChange={onPageChange}
              getNextPage={getNextPage}
              getPrevPage={getPrevPage}
              total={total}
              perPage={perPage}
              page={page}
              perPageUrl={perPageUrl}
            />
          )}
        />
      </Routes>
      <label htmlFor="perPage">
        Select:&nbsp;
        <select
          name="cars"
          id="perPage"
          defaultValue={perPage}
          onChange={getPerPage}
        >
          <option value="3">3</option>
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
        </select>
      </label>
    </div>
  );
};

export default App;
