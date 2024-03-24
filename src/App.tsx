import React, { useState } from 'react';
import './App.css';
import { Pagination } from './components/Pagination';
import { getNumbers } from './utils';

const items = getNumbers(1, 42).map(n => `Item ${n}`);

const DEFAUTL_PER_PAGE = 5;
const DEFAUTL_CURRENT_PAGE = 1;

export const App: React.FC = () => {
  const [total, setTotal] = useState(items.length);
  const [perPage, setPerPage] = useState(DEFAUTL_PER_PAGE);
  const [currentPage, setCurrentPage] = useState(DEFAUTL_CURRENT_PAGE);

  const lastPage = Math.ceil(total / perPage);
  const fromIndex = (currentPage - 1) * perPage;
  const toIndex =
    currentPage === lastPage ? items.length - 1 : currentPage * perPage - 1;

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        Page {currentPage} (items {fromIndex + 1} - {toIndex + 1} of {total})
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            defaultValue={DEFAUTL_PER_PAGE}
            onChange={event => {
              setPerPage(+event.target.value);
              setCurrentPage(1);
            }}
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

      {/* Move this markup to Pagination */}
      <Pagination
        total={total}
        perPage={perPage}
        currentPage={currentPage}
        onPageChange={(
          newTotal: number,
          newPerPage: number,
          newCurrentPage: number,
        ): void => {
          if (newCurrentPage !== currentPage) {
            setCurrentPage(newCurrentPage);
          }

          if (newPerPage !== perPage) {
            setPerPage(newPerPage);
            setCurrentPage(DEFAUTL_CURRENT_PAGE);
          }

          if (newTotal !== total) {
            setTotal(newTotal);
            setPerPage(DEFAUTL_PER_PAGE);
            setCurrentPage(DEFAUTL_CURRENT_PAGE);
          }
        }}
      />
      <ul>
        {getNumbers(fromIndex, toIndex).map(index => (
          <li key={index} data-cy="item">
            {items[index]}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
