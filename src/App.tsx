import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

export const App: React.FC = () => {
  const [itemsPerPage, SetItemsPerPage] = useState(3);
  const [page, SetPage] = useState(1);

  const fromPage = page * itemsPerPage - itemsPerPage + 1;

  const toPage = page * itemsPerPage > 42 ? 42 : page * itemsPerPage;

  const items = getNumbers(fromPage, toPage);

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${page} (items ${fromPage}  - ${toPage} of 42)`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={itemsPerPage}
            onChange={event => SetItemsPerPage(+event.target.value)}
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
        itemsPerPage={itemsPerPage}
        items={items}
        currentPage={page}
        onPageChange={(onPage) => {
          SetPage(onPage);
        }}
      />
    </div>
  );
};

export default App;
