import React, { useState } from 'react';
import './App.css';

import { Pagination } from './components/Pagination';

// eslint-disable-next-line @typescript-eslint/no-unused-vars

const total = 42;

export const App: React.FC = () => {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(5);

  const calculateRange = () => {
    const currentPages = page * perPage;
    const bottomRange = currentPages - perPage;
    const topRange = bottomRange + perPage > total
      ? total : bottomRange + perPage;

    return `${bottomRange + 1} - ${topRange}`;
  };

  const handleswitchPerPage = (newPerPage: string) => {
    if (+newPerPage !== perPage) {
      setPerPage(+newPerPage);
      setPage(1);
    }
  };

  const handleSwitchPage = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${page} (items ${calculateRange()} of ${total})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={perPage}
            onChange={(event) => handleswitchPerPage(event.target.value)}
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
        onPageChange={handleSwitchPage}
      />
    </div>
  );
};

export default App;
