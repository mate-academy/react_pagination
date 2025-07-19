import React, { useState } from 'react';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';
import './App.css';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items: string[] = getNumbers(1, 42).map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [page, setPage] = useState(1);
  const [multiplier, setMultiplier] = useState(0);
  const [option, setSelectorOption] = useState(5);

  const fromItem = option * page - option + 1;
  const toItem = option * page > items.length ? items.length : option * page;

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        Page {page} {''}
        (items {fromItem} - {toItem} of {items.length})
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={option}
            onChange={e => {
              setSelectorOption(+e.target.value);
              setPage(1);
              setMultiplier(0);
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
        items={items}
        itemsQuantity={items.length}
        itemsPerPage={option}
        page={page}
        setPage={setPage}
        multiplier={multiplier}
        setMultiplier={setMultiplier}
      />
    </div>
  );
};

export default App;
