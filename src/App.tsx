import React from 'react';
import './App.css';
import { getNumbers } from './utils';
import { useState } from 'react';
import { Pagination } from './components/Pagination';

const TOTAL_ITEMS = 42;
const items = getNumbers(1, TOTAL_ITEMS).map(n => `Item ${n}`);

type State = {
  total: number;
  perPage: number;
  currentPage: number;
};

export const App: React.FC = () => {
  const [conditions, setConditions] = useState<State>({
    total: TOTAL_ITEMS,
    perPage: 5,
    currentPage: 1,
  });

  const perPageChange = (value: number) => {
    return setConditions({
      ...conditions,
      perPage: value,
      currentPage: 1,
    });
  };

  const currentPageChange = (num: number) => {
    return setConditions({
      ...conditions,
      currentPage: num,
    });
  };

  const startItem =
    conditions.currentPage * conditions.perPage - conditions.perPage + 1;

  const lastItem = () => {
    if (conditions.perPage * conditions.currentPage > items.length) {
      return items.length;
    }

    return conditions.perPage * conditions.currentPage;
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        Page {conditions.currentPage} (items {startItem} - {lastItem()} of{' '}
        {items.length})
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            onChange={event => perPageChange(parseInt(event.target.value))}
            value={conditions.perPage}
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
        total={items}
        perPage={conditions.perPage}
        currentPage={conditions.currentPage}
        onPageChange={currentPageChange}
      />
    </div>
  );
};

export default App;
