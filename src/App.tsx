import React, { useEffect, useState } from 'react';
import './App.css';
import { Pagination } from './components/Pagination';

const TOTAL_ITEMS = 42;

export const App: React.FC = () => {
  const [itemsPerPage, setItemsPerPage] = useState<number>(3);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const firstIndex: number = (currentPage - 1) * itemsPerPage;
  const lastIndex: number = Math.min(currentPage * itemsPerPage, TOTAL_ITEMS);


  useEffect(() => {
    setCurrentPage(1);
  }, [itemsPerPage]);

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        Page {currentPage} (items {firstIndex+1} - {lastIndex} of {TOTAL_ITEMS})
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            onChange={event => setItemsPerPage(+event.target.value)}>
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
        total={TOTAL_ITEMS}
        perPage={itemsPerPage}
        currentPage={currentPage}
        firstIndex={firstIndex}
        lastIndex={lastIndex}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default App;
