import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

const total = 42;

export const App: React.FC = () => {
  const [perPage, setPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  const numberOfPages = Math.ceil(total / perPage);

  const allPages = getNumbers(1, numberOfPages);

  let items: string[] = [];

  if (allPages.length !== currentPage) {
    switch (currentPage) {
      case 1:
        items = getNumbers(1, perPage)
          .map(n => `Item ${n}`);

        break;

      case 2:
      case 3:
      case 4:
      case 5:
      case 6:
      case 7:
      case 8:
      case 9:
      case 10:
      case 11:
      case 12:
      case 13:
      case 14:
        items = getNumbers(perPage * (currentPage - 1) + 1, perPage
        * currentPage)
          .map(n => `Item ${n}`);

        break;

      default: break;
    }
  }

  if (allPages.length === currentPage) {
    items = getNumbers(perPage * (currentPage - 1) + 1, 42)
      .map(n => `Item ${n}`);
  }

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${perPage * (currentPage - 1) + 1} - ${items[items.length - 1].slice(5)} of ${total})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={perPage}
            onChange={(e) => {
              setPerPage(+e.target.value);
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
        total={total} // total number of items to paginate
        perPage={perPage} // number of items per page
        currentPage={currentPage} /* optional with 1 by default */
        onPageChange={(page) => {
          setCurrentPage(page);
        }}
      />
      <ul>
        {
          items.map(item => (
            <li data-cy="item">{item}</li>
          ))
        }
      </ul>
    </div>
  );
};

export default App;
