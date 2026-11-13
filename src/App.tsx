import React, { useState, useEffect } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42).map(n => `Item ${n}`);
const TOTAL = 42;

export const App: React.FC = () => {
  const getParamsFromUrl = () => {
    const params = new URLSearchParams(window.location.search);
    const page = Number(params.get('page')) || 1;
    const perPage = Number(params.get('perPage')) || 5;

    return { page, perPage };
  };

  const initialParams = getParamsFromUrl();

  const [currentPage, setCurrentPage] = useState<number>(initialParams.page);
  const [perPage, setPerPage] = useState<number>(initialParams.perPage);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    params.set('page', String(currentPage));
    params.set('perPage', String(perPage));

    const newUrl = `${window.location.pathname}?${params.toString()}`;

    window.history.pushState({}, '', newUrl);
  }, [currentPage, perPage]);

  const endtems = currentPage * perPage;
  const startItems = endtems - perPage;

  const realEndItem = Math.min(endtems, TOTAL);
  const realStartItem = startItems + 1;

  const handlePageChange = (newPage: number) => {
    if (newPage !== currentPage) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${realStartItem} - ${realEndItem} of ${TOTAL})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={perPage}
            onChange={event => {
              setPerPage(Number(event.target.value));
              setCurrentPage(1);
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
        total={TOTAL}
        perPage={perPage}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />

      <ul>
        {items.slice(startItems, endtems).map(item => (
          <li data-cy="item" key={item}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
