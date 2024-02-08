import React, { useState } from 'react';
import './App.css';
import { Pagination } from './components/Pagination';

export const App: React.FC = () => {
  const totalPages = 42;
  const perPageValues = [3, 5, 10, 20];
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(perPageValues[1]);

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${(currentPage - 1) * perPage + 1} - ${Math.min(currentPage * perPage, totalPages)} of ${totalPages})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            onChange={
              (event) => {
                setPerPage(+event.target.value);
                setCurrentPage(1);
              }
            }
            value={perPage}
          >
            {perPageValues.map((value) => (
              <option key={value} value={value}>{value}</option>
            ))}
          </select>
        </div>

        <label htmlFor="perPageSelector" className="col-form-label col">
          items per page
        </label>
      </div>

      <Pagination
        total={totalPages}
        perPage={perPage}
        currentPage={currentPage}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
};

export default App;
