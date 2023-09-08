import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

const items = getNumbers(1, 42);

export const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(5);

  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleChange: React.ChangeEventHandler<HTMLSelectElement>
    = (event) => {
      setCurrentPage(1);
      setPerPage(+event.target.value);
    };

  const sortPages = (itemsPerPage: number) => {
    const sortedPages = [];

    for (let i = 0; i < items.length; i += itemsPerPage) {
      sortedPages.push(items.slice(i, i + itemsPerPage));
    }

    return sortedPages;
  };

  const firstItemOnPage = sortPages(perPage)[currentPage - 1].at(0);
  const lastItemOnPage = sortPages(perPage)[currentPage - 1].at(-1);

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${firstItemOnPage} - ${lastItemOnPage} of 42)`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            name="perPageSelector"
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            onChange={handleChange}
            defaultValue={5}
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
        total={42}
        perPage={perPage}
        currentPage={currentPage}
        onPageChange={onPageChange}
      />
      <ul>
        {sortPages(perPage)[currentPage - 1].map(number => {
          return (
            <li
              key={number}
              data-cy="item"
            >
              {`Item ${number}`}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default App;
