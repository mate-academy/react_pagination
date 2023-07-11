import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';
import { ItemsList } from './components/ItemsList';

const totalItems = 42;
const items = getNumbers(1, totalItems)
  .map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(5);

  const startIndex = (page - 1) * perPage;
  const endIndex = Math.min(startIndex + perPage - 1, totalItems - 1);
  const currentItems = items.slice(startIndex, endIndex + 1);

  function hadlePerPageChange(itemsCount: number) {
    setPerPage(itemsCount);
    setPage(1);
  }

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${page} (items ${startIndex + 1} - ${endIndex + 1} of ${totalItems})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={perPage}
            onChange={event => hadlePerPageChange(+event.target.value)}
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
        total={totalItems}
        perPage={perPage}
        currentPage={page}
        onPageChange={setPage}
      />

      <ItemsList currentItems={currentItems} />
    </div>
  );
};

export default App;
