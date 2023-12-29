import React, { useState } from 'react';
import './App.css';
import { Pagination } from './components/Pagination';

export const App: React.FC = () => {
  const [perPage, setPerPage] = useState('3');
  const [currentPage, setCurrentPage] = useState(1);
  const [fromPage, setFromPage] = useState('1');
  const [toPage, setToPage] = useState('3');

  function getFromPage(page: number) {
    setFromPage(String((page - 1) * +perPage + 1));
    setToPage(String((page - 1) * +perPage + +perPage));
  }

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${fromPage} - ${toPage} of 42)`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            onChange={(event) => setPerPage(event.target.value)}
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
        total="42"
        perPage={perPage}
        currentPage={currentPage}
        onPageChange={(page) => {
          setCurrentPage(page);
          getFromPage(page);
        }}
      />
    </div>
  );
};

export default App;
