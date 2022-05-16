/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
import { Routes, Route, useSearchParams } from 'react-router-dom';
import './App.css';
import { Pagination } from './components/Pagination/Pagination';

const App: React.FC = () => {
  const [total] = useState(42);
  const [perPage, setPerPage] = useState(5);
  const [page, setPage] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    searchParams.set('page', `${page}`);
    searchParams.set('perPage', `${perPage}`);
    setSearchParams(searchParams);
  }, [page, perPage]);

  const pageChange = (number: number | string) => {
    if (typeof number === 'string') {
      return;
    }

    setPage(number);
  };

  const prevPage = () => {
    setPage(currentPage => currentPage - 1);
  };

  const nextPage = () => {
    setPage(currentPage => currentPage + 1);
  };

  const handlePerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPerPage(+event.target.value);
    setPage(1);
  };

  return (
    <div className="pagination">
      <h1 className="pagination-title">Pagination</h1>

      <label htmlFor="pagination-select">
        Number of pages:
        <select
          id="pagination-select"
          className="pagination-select"
          name="perPage"
          value={perPage}
          onChange={handlePerPageChange}
        >
          <option value="3">3</option>
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
        </select>
      </label>

      <Routes>
        <Route
          path="/"
          element={(
            <Pagination
              total={total}
              perPage={perPage}
              page={page}
              onPageChange={pageChange}
              onPrevPage={prevPage}
              onNextPage={nextPage}
            />
          )}
        />
      </Routes>
    </div>
  );
};

export default App;
