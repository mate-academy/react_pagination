import React from 'react';
import './App.css';
import { v4 as uuidv4 } from 'uuid';
import { getNumbers } from './utils';

const items = getNumbers(1, 42).map((n) => ({
  id: uuidv4(),
  value: `Item ${n}`,
}));

export const App: React.FC = () => {
  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        Page 1 (items 1 - 5 of 42)
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
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

      <ul className="pagination">
        {/* Pagination links here */}
      </ul>

      <ul>
        {items.map((item) => (
          <li key={item.id} data-cy="item">
            {item.value}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
