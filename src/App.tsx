import React, { useState } from 'react';

import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

import './App.css';

export const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(5);

  const total = 42;

  const firstItemOnPage = perPage * (currentPage - 1) + 1;
  const lastItemOnPage = Math.min(perPage * currentPage, total);

  const itemsOnPage = getNumbers(firstItemOnPage, lastItemOnPage);

  const handleChangePerPage = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPerPage(+event.target.value);
    setCurrentPage(1);
  };

  const handleChangePage = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${firstItemOnPage} - ${lastItemOnPage} of ${total})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            onChange={(event) => handleChangePerPage(event)}
          >
            <option value={3}>3</option>
            <option selected value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
          </select>
        </div>

        <label htmlFor="perPageSelector" className="col-form-label col">
          items per page
        </label>
      </div>

      <Pagination
        total={total}
        perPage={perPage}
        currentPage={currentPage}
        onPageChange={handleChangePage}
      />

      <ul>
        {itemsOnPage.map(item => (
          <li
            data-cy="item"
            key={item}
          >
            {`Item ${item}`}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
