import React from 'react';
import './App.css';
import { useState } from 'react';
import { Pagination } from './components/Pagination';

const TOTAL_NUMBER = 42;

export const App: React.FC = () => {
  const [perPage, setPerPages] = useState(5);
  const [currentPage, setCurentPage] = useState(1);
  const fromNum = perPage * currentPage - (perPage - 1);
  const toNum = (num: number, page: number, total: number): number => {
    if (num + page > total) {
      return total;
    }

    return +(num + page - 1);
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>
      <p className="lead" data-cy="info">
        Page {currentPage} (items {fromNum} -{' '}
        {toNum(fromNum, perPage, TOTAL_NUMBER)} of {TOTAL_NUMBER})
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            onChange={event => {
              setPerPages(+event.target.value);
              setCurentPage(1);
            }}
          >
            <option value="3">3</option>
            <option value="5" selected>
              5
            </option>
            <option value="10">10</option>
            <option value="20">20</option>
          </select>
        </div>

        <label htmlFor="perPageSelector" className="col-form-label col">
          items per page
        </label>
      </div>

      <Pagination
        perPage={perPage}
        total={TOTAL_NUMBER}
        currentPage={currentPage}
        onPageChange={page => setCurentPage(page)}
      />
    </div>
  );
};

export default App;
