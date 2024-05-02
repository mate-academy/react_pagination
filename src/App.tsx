import React from 'react';
import { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

export const App: React.FC = () => {
  const totalAmount = 42;
  const items = getNumbers(1, totalAmount).map(n => `Item ${n}`);
  const selectOptions = [3, 5, 10, 20];
  const [value, setValue] = useState(5);
  const [sortPage, setSortPage] = useState(1);

  function mathEndSlice(total: number, v: number, p: number) {
    if (total - v * p > 0) {
      return v * p;
    } else {
      return total;
    }
  }

  const startSlice = value * sortPage - value;
  const endSlice = mathEndSlice(totalAmount, value, sortPage);

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        Page {sortPage} (items {startSlice + 1} - {endSlice} of {totalAmount})
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={value}
            onChange={e => {
              setValue(+e.target.value);
              setSortPage(1);
            }}
          >
            {selectOptions.map(option => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <label htmlFor="perPageSelector" className="col-form-label col">
          items per page
        </label>
      </div>

      <Pagination
        total={totalAmount} // total number of items to paginate
        perPage={value} // number of items per page
        currentPage={sortPage} /* optional with 1 by default */
        onPageChange={page => {
          setSortPage(page);
        }}
      />

      <ul>
        {items.slice(startSlice, endSlice).map(item => (
          <li key={item} data-cy="item">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
