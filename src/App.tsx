import './App.css';

import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';

import { getNumbers, maybeParseInt } from './utils';

import { useUrlQuery } from './hooks/useUrlQuery';

import { Pagination } from './components/Pagination/Pagination';

const items = getNumbers(1, 42).map(n => `Item ${n}`);

const RoutedApp: React.FC = () => {
  const query = useUrlQuery();
  const navigate = useNavigate();

  const [perPage, setPerPage] = useState(
    maybeParseInt(query.get('perPage')) ?? 5,
  );
  const [currentPage, setCurrentPage] = useState(
    maybeParseInt(query.get('page')) ?? 1,
  );

  //const [perPage, setPerPage] = useState<number>(5);
  //const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    if (!query.get('page') || !query.get('perPage')) {
      //history.replace(`?page=${currentPage}&perPage=${perPage}`);
      navigate(`?page=${currentPage}&perPage=${perPage}`);
    }
  }, [perPage, query, navigate, currentPage]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);

    //history.push(`?page=${newPage}&perPage=${perPage}`);
    navigate(`?page=${newPage}&perPage=${perPage}`);
  };

  const handlePerPageChange = (newPerPage: number) => {
    setPerPage(newPerPage);
    setCurrentPage(1);

    //history.push(`?page=${1}&perPage=${newPerPage}`);
    navigate(`?page=${currentPage}&perPage=${newPerPage}`);
  };

  const firstItemOnPage = (currentPage - 1) * perPage + 1;
  const lastItemOnPage = Math.min(currentPage * perPage, items.length);

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        Page {currentPage} (items {firstItemOnPage} - {lastItemOnPage} of{' '}
        {items.length})
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            defaultValue="5"
            onChange={event => handlePerPageChange(Number(event.target.value))}
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
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={RoutedApp} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
