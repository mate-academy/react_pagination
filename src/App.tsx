import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

const total = 42;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, total)
  .map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(5);

  const START_ITEM = perPage * currentPage - perPage + 1;
  const END_ITEM = perPage * currentPage > items.length
    ? items.length
    : perPage * currentPage;

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${START_ITEM} - ${END_ITEM} of ${total})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            defaultValue={perPage}
            onChange={(event) => {
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
      <Pagination
        total={total}
        perPage={perPage}
        currentPage={currentPage}
        onPageChange={(page) => setCurrentPage(page)}
      />
      <ul>
        {items.map((item, index) => {
          if (index >= START_ITEM - 1 && index < END_ITEM) {
            return (
              <li data-cy="item" key={item}>{item}</li>
            );
          }

          return '';
        })}
      </ul>
    </div>
  );
};

export default App;
