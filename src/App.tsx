import React, { useState } from 'react';
import './App.css';
import { Pagination } from './components/Pagination';

export const App: React.FC = () => {
  const [total] = useState(42);
  const [perPage, setPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  const pagesArray = (totalPages: number, currentPages: number) => {
    const pages = [];
    let page = [];

    for (let i = 1; i <= totalPages; i += 1) {
      if (i % currentPages !== 0 && i + 1) {
        page.push(i);
      } else {
        page.push(i);
        pages.push(page);
        page = [];
      }
    }

    if (page.length) {
      pages.push(page);
    }

    return pages;
  };

  const pages = pagesArray(total, perPage);

  const onPageChange = (value: number) => {
    setCurrentPage(value);
  };

  const nextPage = () => {
    setCurrentPage(value => value + 1);
  };

  const prevPage = () => {
    setCurrentPage(value => value - 1);
  };

  const firstItem = pages[currentPage - 1][0];
  const lastItem = pages[currentPage - 1][pages[currentPage - 1].length - 1];

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${firstItem} - ${lastItem} of ${total})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={perPage}
            onChange={(event => {
              setPerPage(+event.target.value);
              setCurrentPage(1);
            })}
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
        pages={pages}
        currentPage={currentPage}
        onPageChange={onPageChange}
        nextPage={nextPage}
        prevPage={prevPage}
      />

      <ul>
        {pages[currentPage - 1].map(page => (
          <li data-cy="item" key={page}>{`Item ${page}`}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
