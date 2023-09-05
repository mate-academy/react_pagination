import React, { useState } from 'react';
import './App.css';
import { Pagination } from './components/Pagination';

const TOTAL = 42;
const PerPagesList = [3, 5, 10, 20];

export const App: React.FC = () => {
  const [perPage, setPerPage] = useState(PerPagesList[1]);
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${currentPage} - ${currentPage + perPage - 1 > TOTAL
          ? TOTAL
          : currentPage + perPage - 1} of ${TOTAL})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            defaultValue={PerPagesList[1]}
          >
            {PerPagesList.map(perP => (
              <option
                key={perP}
                value={perP}
                onClick={() => {
                  setPerPage(perP);
                  setCurrentPage(1);
                }}
              >
                {perP}
              </option>
            ))}
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
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default App;
