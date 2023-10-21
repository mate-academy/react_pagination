import React, { useState } from 'react';
import './App.css';

import { pageOptions } from './utils';
import { Pagination } from './components/Pagination';

const total = 42;

export const App: React.FC = () => {
  const [perPage, setPerPage] = useState(5);
  const [activePage, setActivePage] = useState(1);

  const handlePageCountSelect = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setPerPage(Number(event.target.value));
    setActivePage(1);
  };

  const lastPageCount = ((total - ((activePage - 1) * perPage)) < perPage)
    ? (total - ((activePage - 1) * perPage))
    : perPage;

  return (
    <div className="container">
      <h1>Items with Pagination</h1>
      <p className="lead" data-cy="info">
        {`Page ${activePage} (items ${(activePage - 1) * perPage + 1} - ${((activePage - 1) * perPage) + lastPageCount} of ${total})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={perPage}
            onChange={handlePageCountSelect}
          >
            {pageOptions.map((option) => (
              <option value={option} key={`${option}`}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <label htmlFor="perPageSelector" className="col-form-label col">
          items per page
        </label>
      </div>
      <Pagination
        total={total} // total number of items to paginate
        perPage={perPage} // number of items per page
        currentPage={activePage} /* optional with 1 by default */
        onPageChange={setActivePage}
      />
    </div>
  );
};

export default App;
