import React, { useEffect, useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

const items = getNumbers(1, 42)
  .map(n => `Item ${n}`);

const params = new URLSearchParams(window.location.search);

export const App: React.FC = () => {
  const [
    perPage,
    setPerPage,
  ] = useState(Number(params.get('perPage')) || 5);
  const [
    currentPage,
    setCurrentPage,
  ] = useState(Number(params.get('page')) || 1);
  const total = items.length;
  const firstItemPerPage = currentPage * perPage - perPage + 1;
  const lastItemPerPage = Math.min(total, currentPage * perPage);

  function changeUrlParams(pageParam: number, perPageParam: number) {
    params.set('page', String(pageParam));
    params.set('perPage', String(perPageParam));

    window.history.replaceState({}, '', `${window.location.pathname}?${params}`);
  }

  function onPageChange(newPage: number) {
    changeUrlParams(newPage, perPage);
    setCurrentPage(newPage);
  }

  function onPerPageChange(newPerPage: number) {
    changeUrlParams(1, newPerPage);
    setPerPage(newPerPage);
    setCurrentPage(1);
  }

  useEffect(() => {
    changeUrlParams(currentPage, perPage);
  }, []);

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${firstItemPerPage} - ${lastItemPerPage} of ${total})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            onChange={(e) => onPerPageChange(Number(e.target.value))}
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
        total={total}
        perPage={perPage}
        currentPage={currentPage}
        onPageChange={(page) => onPageChange(page)}
      />

      <ul>
        {items
          .slice(firstItemPerPage - 1, lastItemPerPage)
          .map(el => <li data-cy="item" key={el}>{el}</li>)}
      </ul>
    </div>
  );
};

export default App;
