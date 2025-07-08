import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42).map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [value, setValue] = useState<number>(5);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [currentCountPage, setCurrentCountPage] = useState<number>(1);

  const handleChangeP = (currPage: number) => {
    setCurrentPage(currPage);
  };

  const changeLead = (indexOfCountPages: number): void => {
    setCurrentCountPage(indexOfCountPages);
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {currentCountPage === 0 ? (
          <>
            Page {currentPage} (items {value * currentPage - value + 1} -{' '}
            {Math.min(value * currentPage, items.length)} of 42)
          </>
        ) : (
          <>
            Page {currentPage} (items {value * currentPage - value + 1} -{' '}
            {Math.min(value * currentPage, items.length)} of 42)
          </>
        )}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={value}
            onChange={e => setValue(Number(e.target.value))}
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
        value={value}
        items={items}
        handleChangeP={handleChangeP}
        changeLead={changeLead}
      ></Pagination>
    </div>
  );
};

export default App;
