import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';
import { Items } from './components/Pagination/Items';

export const App: React.FC = () => {
  const [perPageNum, setPerPageNum] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  const total = 42;
  const firstItem = (currentPage - 1) * perPageNum + 1;
  const lastItem = Math.min(currentPage * perPageNum, total);
  const items = getNumbers(firstItem, lastItem);

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${firstItem} - ${lastItem} of ${total})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            onChange={event => {
              setPerPageNum(+event.target.value);
              setCurrentPage(1);
            }}
          >
            <option
              value="3"
            >
              3
            </option>
            <option
              value="5"
              selected
            >
              5
            </option>
            <option
              value="10"
            >
              10
            </option>
            <option
              value="20"
            >
              20
            </option>
          </select>
        </div>

        <label htmlFor="perPageSelector" className="col-form-label col">
          items per page
        </label>
      </div>

      <Pagination
        total={total}
        perPage={perPageNum}
        currentPage={currentPage}
        onPageChange={page => setCurrentPage(page)}
      />

      <Items items={items} />
    </div>
  );
};

export default App;
