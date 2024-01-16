import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination/Pagination';

const items = getNumbers(1, 42).map((n) => `Item ${n}`);

type State = {
  totalItems: string[];
  currentPage: number;
  perPage: number;
};

export const App: React.FC = () => {
  const [state, setState] = useState<State>({
    totalItems: items,
    currentPage: 1,
    perPage: 5,
  });

  function pageChange(value: number) {
    setState((prevState) => ({
      ...prevState,
      currentPage: value,
    }));
  }

  const startIndex = (state.currentPage - 1) * state.perPage + 1;
  const endIndex = Math.min(
    startIndex + state.perPage - 1, state.totalItems.length,
  );

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${state.currentPage} (items ${startIndex} - ${endIndex} of ${state.totalItems.length})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={state.perPage}
            onChange={(event) => {
              setState((prevState) => ({
                ...prevState,
                currentPage: 1,
                perPage: Number(event.target.value),
              }));
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
        total={state.totalItems}
        perPage={state.perPage}
        currentPage={state.currentPage}
        PageChange={async (value) => pageChange(value)}
      />
    </div>
  );
};

export default App;
