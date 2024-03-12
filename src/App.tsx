import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

enum PerPageAmount {
  Three = 3,
  Five = 5,
  Ten = 10,
  Twenty = 20,
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42).map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [perPage, setPerPage] = useState<PerPageAmount>(PerPageAmount.Five);
  const [currentPage, setCurrentPage] = useState(1);
  const firstItem = perPage * currentPage - perPage + 1;
  let lastItem = perPage * currentPage;

  const handlePerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentPage(1);
    setPerPage(+e.target.value);
  };

  if (lastItem > items.length) {
    lastItem = items.length;
  }

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        Page {currentPage} (items {firstItem} - {lastItem} of {items.length})
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={perPage}
            onChange={handlePerPageChange}
          >
            {Object.values(PerPageAmount).map(option => {
              if (Number.isNaN(+option)) {
                return false;
              }

              return (
                <option key={option} value={option}>
                  {option}
                </option>
              );
            })}
          </select>
        </div>

        <label htmlFor="perPageSelector" className="col-form-label col">
          items per page
        </label>
      </div>

      <Pagination
        total={items.length}
        perPage={perPage}
        currentPage={currentPage}
        onPageChange={page => setCurrentPage(page)}
      />
    </div>
  );
};

export default App;
