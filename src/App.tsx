import React, { useState } from 'react';
import './App.css';
import { Pagination } from './components/Pagination/Pagination';
import { Items } from './components/Items/Items.';

// eslint-disable-next-line @typescript-eslint/no-unused-vars

export const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const TOTAL = 42;
  const startItem: number = (currentPage * perPage) - perPage;
  const endItem: number = Math.min(startItem + perPage, TOTAL);

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${startItem + 1} - ${endItem} of ${TOTAL})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={perPage}
            onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
              setPerPage(+event.target.value);
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
        total={TOTAL}
        perPage={perPage}
        currentPage={currentPage}
        onChangePage={(page) => setCurrentPage(page)}
      />
      <Items
        total={TOTAL}
        perPage={perPage}
        currentPage={currentPage}
      />
    </div>
  );
};

export default App;
