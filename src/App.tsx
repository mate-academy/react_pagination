import React from 'react';
import './App.css';
import { getNumbers } from './utils';
import { useState } from 'react';
import { Pagination } from './components/Pagination';

const ITEMS = 42;
const DEFAULT_PER_PAGE = 5;

export const App: React.FC = () => {
  const [perPage, setPerPage] = useState(DEFAULT_PER_PAGE);
  const [currentPage, setCurrentPage] = useState(1);
  const getPagesValue = () => currentPage * perPage;

  const handlePerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPerPage(+event.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (event: React.MouseEvent<HTMLAnchorElement>) => {
    setCurrentPage(+event.currentTarget.innerText);
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${getPagesValue() - (perPage - 1)} - ${getPagesValue() < ITEMS ? getPagesValue() : ITEMS} of ${ITEMS})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            onChange={handlePerPageChange}
          >
            <option value="3">3</option>
            <option value="5" selected={true}>
              5
            </option>
            <option value="10">10</option>
            <option value="20">20</option>
          </select>
        </div>

        <label htmlFor="perPageSelector" className="col-form-label col">
          items per page
        </label>
      </div>
      <Pagination
        total={ITEMS}
        perPage={perPage}
        activePage={currentPage}
        setActivePage={setCurrentPage}
        onPageChange={handlePageChange}
      />
      <ul>
        {getNumbers(
          getPagesValue() - (perPage - 1),
          getPagesValue() < ITEMS ? getPagesValue() : ITEMS,
        ).map(n => {
          return (
            <li data-cy="item" key={n}>
              Item {n}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default App;
