import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42)
  .map(n => `Item ${n}`);

const total = items.length;
const listPerPages = [3, 5, 10, 20];

export const App: React.FC = () => {
  const [perPage, setPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  function handleChangePerPage(e: React.ChangeEvent<HTMLSelectElement>) {
    setPerPage(+e.target.value);
    setCurrentPage(1);
  }

  const lastItemOfPage = Math.min(currentPage * perPage, total);
  const firsItemOfPage = currentPage * perPage - perPage;
  const currentItems = items.slice(firsItemOfPage, lastItemOfPage);

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${firsItemOfPage + 1} - ${lastItemOfPage} of ${total})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={perPage}
            onChange={handleChangePerPage}
          >
            {listPerPages.map(element => (
              <option
                key={element}
                value={element}
              >
                {element}
              </option>
            ))}
          </select>
        </div>

        <label htmlFor="perPageSelector" className="col-form-label col">
          items per page
        </label>
      </div>

      {/* Move this markup to Pagination */}
      <Pagination
        total={total}
        perPage={perPage}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />

      <ul>
        {(currentPage) && (
          currentItems.map(elem => (
            <li
              data-cy="item"
              key={elem}
            >
              {elem}
            </li>
          ))
        )}
      </ul>
    </div>
  );
};
