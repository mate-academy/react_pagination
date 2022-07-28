import React, { useState } from 'react';
import './App.css';
import { Pagination } from './components/Pagination';

export const App: React.FC = () => {
  const [page, setPage] = useState(5);
  const [activePage, setActivePage] = useState(1);

  const setPerPage = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPage(+e.currentTarget.value);
    setActivePage(1);
  };

  const changePage = (pageNumber: number) => {
    setActivePage(pageNumber);
  };

  let lastPage = Math.floor(42 / page + 1);
  const total = 42;
  let start = 1;
  let end = page;

  if (total % page === 0) {
    lastPage = total / page;
  }

  if (activePage !== 1 && activePage !== lastPage) {
    start = page * (activePage - 1) + 1;
    end = activePage * page;
  }

  if (activePage === lastPage && activePage !== 1) {
    start = (lastPage - 1) * page + 1;
    end = total;
  }

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${activePage} (items ${start} - ${end} of ${total})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            onChange={setPerPage}
            value={page}
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

        <Pagination
          total={total}
          perPage={page}
          currentPage={activePage}
          onPageChange={changePage}
        />
      </div>
    </div>
  );
};

export default App;
