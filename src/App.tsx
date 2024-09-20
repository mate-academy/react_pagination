import React, { useState } from 'react';
import './App.css';
import { Pagination } from './components/Pagination';
import { getNumbers } from './utils';

// eslint-disable-next-line @typescript-eslint/no-unused-vars

export const App: React.FC = () => {

  const [perPage, setPerPage] = useState(5)
  const [page, setPage] = useState<number>(1);

  const total = 42;

  const handlePerPageValueChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPerPage(Number(event.target.value));
  }

  const items = getNumbers(1, total).map(n => `Item ${n}`);

  const getCurrentItems = () => {
    const startIndex = (page - 1) * perPage;
    const endIndex = startIndex + perPage;
    return items.slice(startIndex, endIndex);
  };

  const currentItems = getCurrentItems();

  const firstItemNumber = currentItems[0]?.match(/\d+/)?.[0];
  const lastItemNumber = currentItems[currentItems.length - 1]?.match(/\d+/)?.[0]

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        Page {page} (items {firstItemNumber} - {lastItemNumber} of {total})
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            onChange={handlePerPageValueChange}
            defaultValue={5}
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
      // onPageChange={(page) => { ... }}
      page={page}
      setPage={setPage}
      getCurrentItems={getCurrentItems}
      />

    </div>
  );
};

export default App;
