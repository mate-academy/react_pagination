import React, { useState, useEffect } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination/Pagination';

const items = getNumbers(1, 42).map(n => `Item ${n}`);

export const App: React.FC = () => {
  const getParamsFromUrl = () => {
    const params = new URLSearchParams(window.location.search);
    const perPageValue = Number(params.get('perPage')) || 5;
    const rawPage = Number(params.get('page')) || 1;

    const totalPages = Math.ceil(items.length / perPageValue) || 1;
    const pageValue = Math.max(1, Math.min(rawPage, totalPages));

    return { page: pageValue, perPage: perPageValue };
  };

  const [{ page, perPage }, setQueryParams] = useState(getParamsFromUrl);

  useEffect(() => {
    const handlePopState = () => {
      setQueryParams(getParamsFromUrl());
    };

    window.addEventListener('popstate', handlePopState);

    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const updateUrlParams = (newPage: number, newPerPage: number) => {
    const params = new URLSearchParams();

    params.set('page', String(newPage));
    params.set('perPage', String(newPerPage));

    const newUrl = `${window.location.pathname}?${params.toString()}`;

    window.history.pushState({}, '', newUrl);

    setQueryParams({ page: newPage, perPage: newPerPage });
  };

  const indexOfLastItem = page * perPage;
  const indexOfFirstItem = indexOfLastItem - perPage;
  const visibleItems = items.slice(indexOfFirstItem, indexOfLastItem);

  const startItemNum = items.length === 0 ? 0 : indexOfFirstItem + 1;
  const endItemNum = Math.min(indexOfLastItem, items.length);

  const handlePerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newPerPage = Number(event.target.value);

    updateUrlParams(1, newPerPage);
  };

  const handlePageChange = (newPageNum: number) => {
    updateUrlParams(newPageNum, perPage);
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${page} (items ${startItemNum} - ${endItemNum} of ${items.length})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={perPage}
            onChange={handlePerPageChange}
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
        {visibleItems.map(item => (
          <li key={item} data-cy="item">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
