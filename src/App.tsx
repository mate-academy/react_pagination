/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

export const App: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  // читаємо з URL
  const pageFromUrl = Number(searchParams.get('page'));
  const perPageFromUrl = Number(searchParams.get('perPage'));

  const [pegeAmount, setAmount] = useState(
    perPageFromUrl > 0 ? perPageFromUrl : 5,
  );
  const [currentPage, setCurrent] = useState(pageFromUrl > 0 ? pageFromUrl : 1);

  //  синхронізуємо стан  URL
  useEffect(() => {
    setSearchParams({
      page: String(currentPage),
      perPage: String(pegeAmount),
    });
  }, [currentPage, pegeAmount, setSearchParams]);

  const total = 42;
  const pages = Math.ceil(total / pegeAmount);
  const end = currentPage !== pages ? pegeAmount * currentPage : total;
  const start = pegeAmount * (currentPage - 1) + 1;

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        Page {currentPage} (items {start} - {end} of {total})
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={pegeAmount}
            onChange={e => {
              setAmount(Number(e.target.value));
              setCurrent(1);
            }}
          >
            <option value={3}>3</option>
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
          </select>
        </div>

        <label htmlFor="perPageSelector" className="col-form-label col">
          items per page
        </label>
      </div>

      {/* Move this markup to Pagination */}
      <Pagination
        total={total} // total number of items to paginate
        perPage={pegeAmount} // number of items per page
        currentPage={currentPage} /* optional with 1 by default */
        onPageChange={newPege => {
          setCurrent(newPege);
        }}
      />
      <ul>
        {getNumbers(start, end).map(n => (
          <li data-cy="item" key={n}>
            Item {n}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
