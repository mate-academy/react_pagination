import React, { useState } from 'react';
import './App.css';
import { Pagination } from './components/Pagination';
import { getNumbers } from './utils';

const items = getNumbers(1, 42).map((n) => n);

export const App: React.FC = () => {
  const itemsPerPage = ['3', '5', '10', '20'];

  const [currentPage, setCurrentPage] = useState(items[0]);
  const [value, setValue] = useState<string>(itemsPerPage[1]);

  const totalStart = +value * currentPage - +value;
  const totalEnd = +value * currentPage;

  const totalResult = items.slice(totalStart, totalEnd);

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        Page
        {' '}
        {currentPage}
        {` (items ${totalResult[0]} - ${
          totalResult[totalResult.length - 1]
        } of ${items.length})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            value={value}
            id="perPageSelector"
            className="form-control"
            onChange={(event) => {
              setValue(event.target.value);
            }}
          >
            {itemsPerPage.map((it) => (
              <option value={it} key={it}>
                {it}
              </option>
            ))}
          </select>
        </div>

        <label htmlFor="perPageSelector" className="col-form-label col">
          items per page
        </label>
      </div>

      <Pagination
        total={items}
        perPage={+value}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default App;
