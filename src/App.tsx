import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42).map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [perPage, setPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const pageNumberPerPage = perPage * currentPage;
  const pageNumberPerPageValidated =
    pageNumberPerPage > items.length
      ? pageNumberPerPage - (pageNumberPerPage - items.length)
      : pageNumberPerPage;

  const handlePerPageChange = (perPageArg: number) => {
    setPerPage(perPageArg);
    setCurrentPage(1);
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${pageNumberPerPage - perPage + 1} - ${pageNumberPerPageValidated} of ${items.length})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            onChange={event => handlePerPageChange(+event.target.value)}
            defaultValue={5}
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

      <Pagination
        items={items}
        total={42}
        perPage={perPage}
        currentPage={currentPage}
        onPageChange={pageArg => setCurrentPage(pageArg)}
      ></Pagination>
    </div>
  );
};

export default App;
