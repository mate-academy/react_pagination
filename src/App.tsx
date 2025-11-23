import React, { useState } from 'react';
import './App.scss';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

const total: number = 42;
const items = getNumbers(1, total).map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [perPage, setPerPage] = useState(5);
  const [page, setPage] = useState(1);

  const handlePerPageChange = (currentPerPage: number) => {
    setPerPage(currentPerPage);
    setPage(1);
  };

  const handlePageChange = (currentPage: number) => {
    setPage(currentPage);
  };

  function isLastPage() {
    return page === Math.ceil(total / perPage);
  }

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        Page {page} (items {perPage * (page - 1) + 1} -{' '}
        {isLastPage() ? total : perPage * page} of {total})
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={perPage}
            onChange={e => handlePerPageChange(+e.target.value)}
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
        total={total}
        perPage={perPage}
        currentPage={page}
        onPageChange={handlePageChange}
      />
      <ul>
        {items?.slice(perPage * (page - 1), perPage * page).map(item => (
          <li data-cy="item" key={item}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
