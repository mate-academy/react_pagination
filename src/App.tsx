import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42).map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [perPage, setPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  const startIndex = (currentPage * perPage) - perPage + 1;
  const endIndex = ((currentPage * perPage) > items.length)
    ? items.length : (currentPage * perPage);

  const visibleItems = items.slice(
    startIndex - 1, endIndex,
  );

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${startIndex} - ${endIndex} of ${items.length})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={perPage}
            onChange={(e) => {
              setPerPage(+e.target.value);
              setCurrentPage(1);
            }}
          >
            {
              [3, 5, 10, 20].map((countItemsInPage) => (
                <option
                  value={countItemsInPage}
                >
                  {countItemsInPage}
                </option>
              ))
            }
          </select>
        </div>

        <label htmlFor="perPageSelector" className="col-form-label col">
          items per page
        </label>
      </div>

      {/* Move this markup to Pagination */}
      <Pagination
        total={items.length}
        perPage={perPage}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />

      <ul>
        {
          visibleItems.map((item) => (
            <li data-cy="item" key={item}>{item}</li>
          ))
        }
      </ul>
    </div>
  );
};

export default App;
