import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const TOTAL = 42;
const items = getNumbers(1, TOTAL).map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [perPage, setPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  const startSlice = (currentPage - 1) * perPage;
  const endSlice = Math.min(items.length, currentPage * perPage);
  const updatedItems = [...items].slice(startSlice, endSlice);

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        Page {currentPage} (items {startSlice + 1} - {endSlice} of {TOTAL})
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            defaultValue={perPage}
            onChange={e => setPerPage(Number(e.target.value))}
          >
            {[3, 5, 10, 20].map(item => (
              <option value={item} key={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        <label htmlFor="perPageSelector" className="col-form-label col">
          items per page
        </label>
      </div>

      {/* Move this markup to Pagination */}
      <Pagination
        total={TOTAL} // total number of items to paginate
        perPage={perPage} // number of items per page
        currentPage={currentPage} /* optional with 1 by default */
        onPageChange={setCurrentPage}
      />

      <ul>
        {updatedItems.map((item, idx) => (
          <li data-cy="item" key={idx}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
