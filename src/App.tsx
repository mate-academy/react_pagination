import React, { ChangeEvent, useEffect, useState } from 'react';
import './App.css';
import {
  Routes, Route, useLocation,
} from 'react-router-dom';
import { getNumbers } from './utils';
import { Content } from './components/Content/Content';
import { Pagination } from './components/Pagination';

const items = getNumbers(1, 42)
  .map(n => `Item ${n}`);

export const App: React.FC = () => {
  const { search } = useLocation();
  const page = new URLSearchParams(search).get('page') || 1;
  const perPage = new URLSearchParams(search).get('perPage') || 5;

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const total = items.length;
  const from = currentPage * itemsPerPage - itemsPerPage;
  const to = currentPage * itemsPerPage > total
    ? total
    : currentPage * itemsPerPage;
  const itemsToShow = items.slice(from, to);

  useEffect(() => {
    if (currentPage !== +page) {
      setCurrentPage(+page);
      setItemsPerPage(+perPage);
    }
  }, [page, perPage]);

  const handlerItemsPerPage = (event: ChangeEvent<HTMLSelectElement>) => {
    setItemsPerPage(+event.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${from + 1} - ${to} of ${total})` }
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={itemsPerPage}
            onChange={(event) => {
              handlerItemsPerPage(event);
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
        total={items.length} // total number of items to paginate
        perPage={itemsPerPage} // number of items per page
        currentPage={currentPage} /* optional with 1 by default */
        onPageChange={setCurrentPage}
      />
      <Routes>
        <Route
          path="*"
          element={<Content items={itemsToShow} />}
        />
      </Routes>
    </div>
  );
};
