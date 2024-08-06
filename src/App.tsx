import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

// eslint-disable-next-line @typescript-eslint/no-unused-vars

export const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const items = getNumbers(1, 42).map(n => `Item ${n}`);
  const handleChangeSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPerPage(+event.target.value);
    if (currentPage !== 1) {
      setCurrentPage(1);
    }
  };

  const handleChangePage = (page: number) => {
    setCurrentPage(page);
  };

  const startItem = (currentPage - 1) * perPage + 1;
  const endItem =
    currentPage * perPage > items.length ? items.length : currentPage * perPage;

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        Page {currentPage} (items {startItem} - {endItem} of {items.length})
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={+perPage}
            onChange={handleChangeSelect}
          >
            {[3, 5, 10, 20].map(num => (
              <option value={num} key={num}>
                {num}
              </option>
            ))}
          </select>
        </div>

        <label htmlFor="perPageSelector" className="col-form-label col">
          items per page
        </label>
      </div>

      {/* Move this markup to Pagination */}
      <Pagination
        total={items}
        perPage={perPage}
        currentPage={currentPage}
        onPageChange={handleChangePage}
      />
    </div>
  );
};

export default App;
