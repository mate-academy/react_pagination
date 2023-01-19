import React, { useCallback, useState } from 'react';
import './App.css';
import { Pagination } from './components/Pagination';
import { getNumbers } from './utils';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42)
  .map(n => `Item ${n}`);

export const App: React.FC = () => {
  const startPage = 1;
  const startSelect = 5;
  const countOfItems = 42;

  const [page, setPage] = useState(startPage);
  const [select, setSelect] = useState(startSelect);

  const startItems = page * select - select;

  const endItems = page * select <= countOfItems
    ? page * select
    : countOfItems;

  const visibleItems = items.slice(startItems, endItems);

  const handlePageChange = useCallback((currentPage: number | string) => {
    if (typeof currentPage === 'number') {
      setPage(currentPage);
    }

    if (currentPage === 'prev') {
      setPage(prev => prev - 1);
    }

    if (currentPage === 'next') {
      setPage(prev => prev + 1);
    }
  }, []);

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${page} (items ${startItems + 1} - ${endItems} of 42)`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={select}
            onChange={(event) => {
              setSelect(Number(event.target.value));
              setPage(1);
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

      {/* Move this markup to Pagination */}

      <Pagination
        total={42}
        perPage={select}
        currentPage={page}
        onPageChange={handlePageChange}
      />

      <ul>
        {visibleItems.map(item => (
          <li data-cy="item">{item}</li>
        ))}

      </ul>
    </div>
  );
};

export default App;
