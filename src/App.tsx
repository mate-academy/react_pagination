import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utilities/utils';
import { Pagination } from './components/Pagination';
import { total } from './utilities/total';

export const App: React.FC = () => {
  const [value, setValue] = useState(5);

  const [currentPage, setCurrentPage] = useState(1);

  const start = currentPage * value - value + 1;
  const end = start + value - 1 < total ? start + value - 1 : total;

  const items = getNumbers(1, total).map(n => `Item ${n}`);

  const perPageSelector = [3, 5, 10, 20];

  const visibleItems = items.slice(start - 1, end);

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        Page {currentPage} (items {start} - {end} of {total})
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={value}
            onChange={event => {
              setValue(+event.target.value);
              setCurrentPage(1);
            }}
          >
            {perPageSelector.map(selector => (
              <option key={selector} value={selector}>
                {selector}
              </option>
            ))}
          </select>
        </div>

        <label htmlFor="perPageSelector" className="col-form-label col">
          items per page
        </label>
      </div>
      <Pagination
        total={total}
        perPage={value}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
      <ul>
        {visibleItems.map(item => (
          <li key={item} data-cy="item">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
