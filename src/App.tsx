import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42).map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [itemsPerPage, setItemsPerPage] = useState<number>(5);
  const [activePage, setActivePage] = useState<number>(1);
  const pageCount = Math.ceil(items.length / itemsPerPage);

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${activePage} (items ${activePage * itemsPerPage - itemsPerPage + 1} - ${
          activePage * itemsPerPage > 42 ? 42 : activePage * itemsPerPage
        } of 42)`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={itemsPerPage}
            onChange={e => {
              setItemsPerPage(Number(e.target.value));
              setActivePage(1);
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
        itemsPerPage={itemsPerPage}
        items={items}
        activePage={activePage}
        setActivePage={setActivePage}
        pageCount={pageCount}
      />
    </div>
  );
};

export default App;
