import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

const items: string[] = getNumbers(1, 42)
  .map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [perPage, setPerPag] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  let startNumber: number = currentPage - 1;
  let endNumber = startNumber + perPage;

  if (currentPage > 1) {
    startNumber = perPage * currentPage - perPage;
  }

  if (endNumber > 42) {
    endNumber = 42;
  }

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`${`Page ${currentPage} (items ${startNumber + 1} - `}${endNumber} of 42)`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={perPage}
            onChange={(event) => setPerPag(+event.target.value)}
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
        setCurrentPage={setCurrentPage}
        total={getNumbers(1, Math.ceil(42 / perPage))}
        // perPage={perPage}
        currentPage={currentPage}
      />
      <ul>

        {
          items.filter((_, index) => index < (perPage * currentPage)
            && index >= startNumber)
            .map((item) => (
              <li
                data-cy="item"
                key={item}
              >
                {item}
              </li>
            ))
        }
      </ul>
    </div>
  );
};

export default App;
