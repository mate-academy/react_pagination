import React, { useState } from 'react';
import './App.css';
import { Pagination } from './components/Pagination';
import { START } from './constants';

export const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(START.PAGE);
  const [perPage, setPerPage] = useState(START.AMOUNT_ITEMS);

  const firstItem = START.PAGE + perPage * (currentPage - START.PAGE);
  const lastItem = Math.min(
    (perPage + perPage * (currentPage - START.PAGE)), START.NUMBER_ITEMS,
  );

  const countPage = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPerPage(+event.target.value);
    setCurrentPage(START.PAGE);
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${firstItem} - ${lastItem} of 42)`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={perPage}
            onChange={countPage}
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
        total={START.NUMBER_ITEMS}
        perPage={perPage}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        firstItem={firstItem}
        lastItem={lastItem}
      />
    </div>
  );
};

export default App;
