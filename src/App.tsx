import React, { useState } from 'react';
import './App.css';
import { Pagination } from './components/Pagination';
import { getNumbers } from './utils';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42).map(el => `Item ${el}`);

export const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentOption, setCurrentOption] = useState(5);

  const currentResultMultiply = currentPage * currentOption;
  const firstPage = currentResultMultiply - currentOption + 1;

  function handleOpptionValue(e: React.ChangeEvent<HTMLSelectElement>) {
    setCurrentPage(1);
    setCurrentOption(+e.target.value);
  }

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {/* eslint-disable-next-line max-len */}
        Page {currentPage} (items {firstPage} -{' '}
        {items.length > currentResultMultiply
          ? currentResultMultiply
          : items.length}{' '}
        of {items.length})
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            defaultValue={currentOption}
            onChange={handleOpptionValue}
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

      {/* Move this markup to Pagination */}
      <Pagination
        total={items}
        perPage={currentOption}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default App;
