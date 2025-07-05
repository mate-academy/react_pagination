import React, { useEffect, useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42).map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [itemPerPage, setItemPerPage] = useState(5);
  const [page, setPage] = useState(1);
  const [startNumber, setStartNumber] = useState(1);
  const [endNumber, setEndNumber] = useState(5);

  function pageChange(pages: number) {
    setPage(pages);
    setStartNumber((pages - 1) * itemPerPage + 1);
    setEndNumber(Math.min(pages * itemPerPage, 42));
  }

  useEffect(() => {
    pageChange(page);
    setPage(1);
  }, [itemPerPage]);

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        Page {page} (items {startNumber} - {endNumber} of 42)
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            onChange={e => {
              setItemPerPage(+e.target.value);
            }}
            value={itemPerPage}
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
        perPage={itemPerPage}
        currentPage={page}
        onPageChange={pageChange}
      />
    </div>
  );
};

export default App;
