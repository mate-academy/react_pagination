import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { useSearchParams } from 'react-router-dom';
import { Pagination } from './components/Pagination';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
// const items = getNumbers(1, 5).map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const pageFromUrl = Number(searchParams.get('page')) || 1;
  const perPageFromUrl = Number(searchParams.get('perPage')) || 5;
  const [currentPage, setCurrentPage] = useState(pageFromUrl);
  const [perPage, setPerPage] = useState(perPageFromUrl);

  function handlePageChange(numPage: number) {
    if (numPage === currentPage) {
      return;
    }

    setCurrentPage(numPage);
    setSearchParams({
      page: String(numPage),
      perPage: String(perPage),
    });
  }

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const newPerPage = Number(e.target.value);

    setPerPage(newPerPage);
    setCurrentPage(1);
    setSearchParams({ page: `${1}`, perPage: `${newPerPage}` });
  }

  const total = 42;
  const perPages = perPage;
  const start = (currentPage - 1) * perPages + 1;
  const end = Math.min(start + perPages - 1, total);
  const items = getNumbers(start, end).map(n => `Item ${n}`);

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
            value={perPage}
            className="form-control"
            onChange={handleChange}
          >
            {[3, 5, 10, 20].map(el => {
              return (
                <option key={el} value={el}>
                  {el}
                </option>
              );
            })}
          </select>
        </div>

        <label htmlFor="perPageSelector" className="col-form-label col">
          items per page
        </label>
      </div>

      {/* Move this markup to Pagination */}
      <Pagination
        total={42}
        perPage={perPage}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
      <ul>
        {items.map((el, index) => {
          return (
            <li key={index} data-cy="item">
              {el}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default App;
